---
type: jargon-tech
id: compartment-environment
name: Compartment / Environment
description: CloudPlatform compartment used to isolate regional infrastructure and configuration, such as separate compartments for EU, CN, and other regions.
status: active
related_systems: [service-order-manager]
---

# Compartment / Environment

## Overview

A compartment is an CloudPlatform isolation boundary used to separate regional infrastructure, configuration, and deployments. RetailCo operates separate compartments per region (e.g., EU compartment, market-cn compartment), each containing region-specific system configurations, inventory data, and deployment targets.

## Details

### Role in Deployments
Deployment scripts and configuration changes must target the correct compartment. Each compartment holds region-specific state for systems like the Service Order Manager — including its inventory module configuration.

### Critical Risk: Cross-Compartment Errors
If a deployment script intended for one compartment (e.g., CN) is executed against a different compartment (e.g., EU), it can overwrite region-specific configuration with incorrect values. This has caused mass false backorders — see `cross-compartment-deployment-error`.

### Safeguard Gap
There is no automated validation preventing a script targeted at one compartment from being run against another. This makes compartment selection a single point of human error during cutover operations.
