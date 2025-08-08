# GitHub Actions Management Scripts

Utility scripts for monitoring and managing GitHub Actions workflows in this repository.

## Scripts

### `monitor-workflows.sh`
- **Purpose**: Real-time monitoring of GitHub Actions workflow status
- **Usage**: `./monitor-workflows.sh`
- **Features**: Shows running workflows, recent successes/failures, dependabot PR status

### `workflow-cleanup.sh` 
- **Purpose**: Comprehensive analysis of workflow status and cleanup recommendations
- **Usage**: `./workflow-cleanup.sh`
- **Features**: Status overview, branch analysis, cleanup suggestions

### `workflow-final-status.sh`
- **Purpose**: Final summary of all workflow fixes and current status
- **Usage**: `./workflow-final-status.sh`  
- **Features**: Problem/solution summary, success rate calculation

## Requirements

- GitHub CLI (`gh`) installed and authenticated
- Repository access permissions
- Run from repository root directory

## Notes

These scripts were created during the GitHub Actions workflow debugging and fixing process.
They can be safely removed once workflows are stable and running correctly.
