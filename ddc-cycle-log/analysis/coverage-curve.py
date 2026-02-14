#!/usr/bin/env python3
"""
DDC Coverage Curve Analysis

Parses DDC cycle log files and generates convergence plots showing:
1. Cumulative entities created per cycle
2. New entities per cycle (should decrease over time)
3. Context reuse signal

Usage:
    python coverage-curve.py /path/to/ddc-cycle-logs/
    python coverage-curve.py /path/to/ddc-cycle-logs/ --output chart.png
"""

import argparse
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("PyYAML required: pip install pyyaml")
    sys.exit(1)


def parse_cycle_log(file_path: Path) -> dict:
    """Parse a DDC cycle log markdown file and extract frontmatter metrics."""
    content = file_path.read_text()

    # Extract YAML frontmatter
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return None

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError:
        print(f"Warning: Could not parse frontmatter in {file_path}")
        return None

    return {
        "cycle_id": frontmatter.get("cycle_id", "???"),
        "problem_name": frontmatter.get("problem_name", file_path.stem),
        "date_started": str(frontmatter.get("date_started", "")),
        "date_completed": str(frontmatter.get("date_completed", "")),
        "time_spent_minutes": frontmatter.get("time_spent_minutes", 0),
        "entities_created": frontmatter.get("entities_created", 0),
        "entities_updated": frontmatter.get("entities_updated", 0),
        "file": str(file_path),
    }


def print_summary(cycles: list[dict]):
    """Print a text summary of DDC cycle metrics."""
    print(f"\n{'='*60}")
    print(f"DDC Coverage Curve Summary — {len(cycles)} cycles")
    print(f"{'='*60}\n")

    cumulative = 0
    total_time = 0

    print(f"{'Cycle':<8} {'Problem':<35} {'New':>5} {'Upd':>5} {'Cum':>5} {'Min':>5}")
    print(f"{'-'*8} {'-'*35} {'-'*5} {'-'*5} {'-'*5} {'-'*5}")

    for c in cycles:
        created = c["entities_created"]
        updated = c["entities_updated"]
        cumulative += created
        total_time += c["time_spent_minutes"]
        name = c["problem_name"][:35]
        print(f"{c['cycle_id']:<8} {name:<35} {created:>5} {updated:>5} {cumulative:>5} {c['time_spent_minutes']:>5}")

    print(f"\n{'Summary':}")
    print(f"  Total entities created: {cumulative}")
    print(f"  Total time spent: {total_time} minutes ({total_time/60:.1f} hours)")
    if len(cycles) > 0:
        print(f"  Avg entities per cycle: {cumulative/len(cycles):.1f}")
        print(f"  Avg time per cycle: {total_time/len(cycles):.0f} minutes")

    # Convergence signal
    if len(cycles) >= 3:
        first_half = cycles[:len(cycles)//2]
        second_half = cycles[len(cycles)//2:]
        avg_first = sum(c["entities_created"] for c in first_half) / len(first_half)
        avg_second = sum(c["entities_created"] for c in second_half) / len(second_half)
        print(f"\n  Convergence signal:")
        print(f"    First half avg new entities: {avg_first:.1f}")
        print(f"    Second half avg new entities: {avg_second:.1f}")
        if avg_second < avg_first:
            reduction = (1 - avg_second/avg_first) * 100
            print(f"    Reduction: {reduction:.0f}% fewer new entities in second half")
        else:
            print(f"    No convergence signal yet — second half needs more context than first")


def plot_coverage(cycles: list[dict], output_path: str = None):
    """Generate a matplotlib coverage curve chart."""
    try:
        import matplotlib.pyplot as plt
    except ImportError:
        print("\nmatplotlib required for plotting: pip install matplotlib")
        print("Text summary shown above instead.")
        return

    cycle_ids = [c["cycle_id"] for c in cycles]
    new_entities = [c["entities_created"] for c in cycles]
    cumulative = []
    total = 0
    for n in new_entities:
        total += n
        cumulative.append(total)
    time_spent = [c["time_spent_minutes"] for c in cycles]

    fig, axes = plt.subplots(2, 1, figsize=(10, 8), sharex=True)

    # Plot 1: Cumulative entities
    axes[0].bar(cycle_ids, new_entities, color="#6366F1", alpha=0.7, label="New entities")
    ax2 = axes[0].twinx()
    ax2.plot(cycle_ids, cumulative, color="#DC2626", marker="o", linewidth=2, label="Cumulative")
    axes[0].set_ylabel("New Entities per Cycle")
    ax2.set_ylabel("Cumulative Entities")
    axes[0].set_title("DDC Coverage Curve")
    axes[0].legend(loc="upper left")
    ax2.legend(loc="upper right")

    # Plot 2: Time per cycle
    axes[1].bar(cycle_ids, time_spent, color="#059669", alpha=0.7)
    axes[1].set_ylabel("Time (minutes)")
    axes[1].set_xlabel("Cycle")
    axes[1].set_title("Curation Time per Cycle")

    plt.tight_layout()

    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches="tight")
        print(f"\nChart saved to {output_path}")
    else:
        plt.show()


def main():
    parser = argparse.ArgumentParser(description="DDC Coverage Curve Analysis")
    parser.add_argument("cycle_logs_dir", help="Path to directory containing DDC cycle log files")
    parser.add_argument("--output", "-o", help="Output path for chart image (optional)")
    parser.add_argument("--no-plot", action="store_true", help="Skip plotting, text summary only")
    args = parser.parse_args()

    logs_dir = Path(args.cycle_logs_dir)
    if not logs_dir.is_dir():
        print(f"Error: {logs_dir} is not a directory")
        sys.exit(1)

    # Find and parse cycle log files
    log_files = sorted(logs_dir.glob("*.md"))
    log_files = [f for f in log_files if f.name != "FORMAT.md"]

    if not log_files:
        print(f"No cycle log files found in {logs_dir}")
        sys.exit(1)

    cycles = []
    for f in log_files:
        cycle = parse_cycle_log(f)
        if cycle:
            cycles.append(cycle)

    if not cycles:
        print("No valid cycle logs found")
        sys.exit(1)

    # Sort by cycle_id
    cycles.sort(key=lambda c: c["cycle_id"])

    # Print text summary
    print_summary(cycles)

    # Plot if requested
    if not args.no_plot:
        plot_coverage(cycles, args.output)


if __name__ == "__main__":
    main()