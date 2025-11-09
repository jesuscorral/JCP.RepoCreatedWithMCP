# 🎯 GitHub Automation Templates

## 🤖 GitHub Actions for Multi-Repository Management

### 1. Cross-Repository Issue Sync
```yaml
# .github/workflows/cross-repo-sync.yml
name: Cross-Repository Issue Sync
on:
  issues:
    types: [labeled, unlabeled, opened, edited]

jobs:
  sync-to-portfolio:
    if: contains(github.event.label.name, 'cross-repo/')
    runs-on: ubuntu-latest
    steps:
      - name: Add to Portfolio Project
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.ORG_PROJECT_TOKEN }}
          script: |
            const issue = context.payload.issue;
            const label = context.payload.label?.name;
            
            // Determine target portfolio project based on label
            let projectNumber;
            if (label.includes('frontend')) projectNumber = 1; // Frontend Portfolio
            if (label.includes('backend')) projectNumber = 2;  // Backend Portfolio  
            if (label.includes('mobile')) projectNumber = 3;   // Mobile Portfolio
            
            if (projectNumber) {
              await github.rest.projects.createCard({
                column_id: 'PORTFOLIO_BACKLOG_COLUMN_ID',
                content_id: issue.id,
                content_type: 'Issue'
              });
            }

  escalate-to-executive:
    if: contains(github.event.label.name, 'escalate-to-exec')
    runs-on: ubuntu-latest
    steps:
      - name: Add to Executive Dashboard
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.ORG_PROJECT_TOKEN }}
          script: |
            // Add issue to Executive Dashboard project
            // Send Slack notification to #executive-alerts
            // Create calendar event for next executive review
```

### 2. Portfolio Health Check
```yaml
# .github/workflows/portfolio-health.yml
name: Portfolio Health Check
on:
  schedule:
    - cron: '0 9 * * MON' # Every Monday at 9 AM

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Portfolio Report
        uses: actions/github-script@v6
        with:
          script: |
            const portfolios = ['frontend', 'backend', 'mobile'];
            let report = '# 📊 Weekly Portfolio Health Report\n\n';
            
            for (const portfolio of portfolios) {
              const issues = await github.rest.search.issuesAndPullRequests({
                q: `org:${context.repo.owner} label:domain/${portfolio} is:open`
              });
              
              const overdueIssues = issues.data.items.filter(issue => {
                const dueDate = issue.milestone?.due_on;
                return dueDate && new Date(dueDate) < new Date();
              });
              
              report += `## ${portfolio.toUpperCase()} Portfolio\n`;
              report += `- Total open issues: ${issues.data.total_count}\n`;
              report += `- Overdue issues: ${overdueIssues.length}\n\n`;
            }
            
            // Send report to Slack
            // Email to portfolio owners
            // Update dashboard
```

### 3. Release Coordination
```yaml
# .github/workflows/release-coordination.yml
name: Release Coordination
on:
  release:
    types: [published]

jobs:
  coordinate-release:
    runs-on: ubuntu-latest
    steps:
      - name: Update Portfolio Projects
        run: |
          echo "Release ${{ github.event.release.tag_name }} published"
          # Update portfolio project status
          # Check for cross-repository dependencies
          # Notify dependent repositories
          # Update executive dashboard

      - name: Cross-Repository Impact Analysis
        uses: actions/github-script@v6
        with:
          script: |
            // Analyze which other repositories might be affected
            // Check for API breaking changes
            // Create follow-up issues in dependent repos
```

## 🔔 Slack Integration

### 1. Portfolio Notifications
```yaml
# Slack webhook configuration
Frontend Portfolio:
  webhook_url: ${{ secrets.SLACK_FRONTEND_WEBHOOK }}
  channel: "#frontend-team"
  triggers:
    - cross-repository dependency created
    - performance regression detected
    - design system update available

Backend Portfolio:
  webhook_url: ${{ secrets.SLACK_BACKEND_WEBHOOK }}
  channel: "#backend-team"  
  triggers:
    - API breaking change proposed
    - database migration required
    - service health alert

Executive Team:
  webhook_url: ${{ secrets.SLACK_EXEC_WEBHOOK }}
  channel: "#executive-alerts"
  triggers:
    - critical issue escalated
    - milestone missed
    - budget variance detected
```

### 2. Daily Standup Reports
```yaml
# .github/workflows/daily-standup.yml
name: Daily Standup Report
on:
  schedule:
    - cron: '30 8 * * MON-FRI' # 8:30 AM weekdays

jobs:
  standup-report:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Team Reports
        run: |
          # Generate per-team standup summaries
          # Include: completed yesterday, planned today, blockers
          # Send to team Slack channels
          # Aggregate into portfolio summary
```

## 📊 Custom GitHub Actions

### 1. Issue Triage Bot
```javascript
// .github/actions/issue-triage/action.js
const { Octokit } = require('@octokit/rest');

async function triageIssue(context) {
  const issue = context.payload.issue;
  
  // Auto-assign labels based on content
  const labels = [];
  
  if (issue.body.includes('bug') || issue.title.includes('[BUG]')) {
    labels.push('type/bug');
  }
  
  if (issue.body.includes('performance')) {
    labels.push('performance');
  }
  
  // Auto-assign to portfolio based on repository
  const repoName = context.repo.repo;
  if (repoName.includes('web') || repoName.includes('ui')) {
    labels.push('domain/frontend');
  }
  
  // Add to appropriate project
  await github.rest.issues.addLabels({
    ...context.repo,
    issue_number: issue.number,
    labels
  });
}
```

### 2. Dependency Tracker
```javascript
// .github/actions/dependency-tracker/action.js
async function trackDependencies(context) {
  const issue = context.payload.issue;
  
  // Parse dependency mentions in issue body
  const dependencyPattern = /depends on ([\w-]+)\/?(#\d+)?/g;
  const matches = [...issue.body.matchAll(dependencyPattern)];
  
  for (const match of matches) {
    const [, repo, issueNumber] = match;
    
    // Create link between issues
    await github.rest.issues.createComment({
      ...context.repo,
      issue_number: issue.number,
      body: `🔗 Tracking dependency: ${repo}${issueNumber || ''}`
    });
    
    // Add to coordination project
    await addToCoordinationProject(repo, issue);
  }
}
```

## 📈 Reporting Automation

### 1. Executive Summary Generator
```yaml
# .github/workflows/executive-summary.yml
name: Executive Summary
on:
  schedule:
    - cron: '0 17 * * FRI' # Friday 5 PM

jobs:
  generate-summary:
    runs-on: ubuntu-latest
    steps:
      - name: Collect Metrics
        run: |
          # Velocity across all teams
          # Budget vs actual spend
          # Risk assessment
          # Strategic initiative progress
          
      - name: Generate Report
        uses: actions/github-script@v6
        with:
          script: |
            const report = {
              week: new Date().toISOString().slice(0, 10),
              metrics: {
                velocity: calculateVelocity(),
                risks: assessRisks(),
                strategic_progress: calculateStrategicProgress()
              }
            };
            
            // Send to executive team
            await sendExecutiveReport(report);
```

### 2. Portfolio Performance Dashboard
```yaml
# .github/workflows/portfolio-metrics.yml  
name: Portfolio Metrics Update
on:
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  update-metrics:
    runs-on: ubuntu-latest
    steps:
      - name: Calculate Portfolio Metrics
        run: |
          # Cross-repository integration health
          # Code quality metrics aggregation
          # Performance benchmarks
          # Technical debt assessment
          
      - name: Update Dashboard
        run: |
          # Update GitHub Project custom fields
          # Send metrics to analytics platform
          # Generate trend analysis
```

## 🔧 Setup Instructions

### 1. Required Secrets
```bash
# Organization level secrets
ORG_PROJECT_TOKEN=ghp_xxxxxxxxxxxx # Personal access token with project permissions
SLACK_EXECUTIVE_WEBHOOK=https://hooks.slack.com/services/xxx
SLACK_FRONTEND_WEBHOOK=https://hooks.slack.com/services/xxx  
SLACK_BACKEND_WEBHOOK=https://hooks.slack.com/services/xxx
SLACK_MOBILE_WEBHOOK=https://hooks.slack.com/services/xxx
```

### 2. GitHub App Configuration
```yaml
# Create GitHub App with permissions:
permissions:
  issues: write
  projects: write
  repository_projects: write
  metadata: read
  pull_requests: write
  
events:
  - issues
  - pull_request  
  - release
  - project_card
```

### 3. Slack App Setup
```yaml
# Slack app capabilities
bot_user_oauth_token: required
channels:
  - "#frontend-team"
  - "#backend-team"
  - "#mobile-team"
  - "#executive-alerts"
  - "#project-updates"

slash_commands:
  - "/portfolio-status"
  - "/escalate-issue"
  - "/sprint-summary"
```