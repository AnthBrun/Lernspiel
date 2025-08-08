#!/bin/bash

echo "=== COMPREHENSIVE WORKFLOW STATUS & CLEANUP ==="
echo "Date: $(date)"
echo ""

echo "📊 Current Workflow Status:"
echo "In Progress: $(gh run list --status=in_progress | wc -l) workflows"
echo "Failed: $(gh run list --status=failure --limit 50 | wc -l) workflows"
echo "Success: $(gh run list --status=success --limit 50 | wc -l) workflows"

echo ""
echo "🔍 Recent Failed Workflows (Top 10):"
gh run list --status=failure --limit 10 --json workflowName,displayTitle,conclusion,headBranch \
  --jq '.[] | "❌ " + .workflowName + " | " + .headBranch + " | " + (.displayTitle | .[0:60]) + "..."'

echo ""
echo "🌿 All Branches:"
git branch -a | grep -E "(dependabot|master|backend|frontend|cms)" | sort

echo ""
echo "🚀 Testing New Workflow Fixes:"

# Test if we can trigger workflows
echo "Checking if workflows would run on current changes..."
git status --porcelain | wc -l | xargs -I {} echo "Uncommitted files: {}"

echo ""
echo "💡 Recommendations:"
echo "1. ✅ CMS pnpm version fixed (8 -> 9)"
echo "2. ✅ Lock file auto-generation enabled"
echo "3. ⏳ Consider cleaning up old dependabot branches"
echo "4. ⏳ Consider disabling CodeQL if not needed (requires repo admin)"

echo ""
echo "🧹 Dependabot Branch Cleanup (Run manually if needed):"
echo "git branch -r | grep 'dependabot/' | sed 's/origin\///' | xargs -I {} echo 'git push origin --delete {}'"
