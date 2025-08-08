#!/bin/bash

echo "=== GitHub Actions Workflow Status Monitor ==="
echo "Date: $(date)"
echo ""

echo "🔄 Currently Running Workflows:"
gh run list --status=in_progress --limit 10

echo ""
echo "✅ Recent Successful Workflows:"
gh run list --status=success --limit 5

echo ""
echo "❌ Recent Failed Workflows:"
gh run list --status=failure --limit 5

echo ""
echo "📊 Workflow Summary (Last 20 runs):"
echo "Success: $(gh run list --limit 20 --status=success | wc -l) runs"
echo "Failure: $(gh run list --limit 20 --status=failure | wc -l) runs" 
echo "In Progress: $(gh run list --limit 20 --status=in_progress | wc -l) runs"

echo ""
echo "🔍 Dependabot PRs Status:"
gh pr list | grep "dependabot" || echo "No Dependabot PRs found"

echo ""
echo "📈 Recent Workflow Activity:"
gh run list --limit 10 --json conclusion,status,displayTitle,createdAt --jq '.[] | "\(.status // .conclusion // "unknown") | \(.displayTitle) | \(.createdAt)"' | head -10
