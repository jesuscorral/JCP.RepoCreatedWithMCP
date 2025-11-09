#!/bin/bash

# 🚀 GitHub Organization Setup Script
# This script helps you replicate the project management structure across repositories

echo "🏢 GitHub Organization Setup Tool"
echo "================================"

# Configuration
ORG_NAME="your-organization-name"
REPOS=("repo1" "repo2" "repo3" "repo4" "repo5" "repo6" "repo7" "repo8" "repo9" "repo10")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up multi-repository project management...${NC}"

# Function to check if GitHub CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        echo -e "${RED}GitHub CLI (gh) is not installed.${NC}"
        echo "Please install it from: https://cli.github.com/"
        exit 1
    fi
}

# Function to create labels across all repositories
create_standard_labels() {
    echo -e "${YELLOW}Creating standard labels across repositories...${NC}"
    
    # Priority labels
    PRIORITY_LABELS=(
        "priority/critical,#FF0000,Critical priority issues"
        "priority/high,#FF8C00,High priority issues"  
        "priority/medium,#FFD700,Medium priority issues"
        "priority/low,#90EE90,Low priority issues"
    )
    
    # Type labels  
    TYPE_LABELS=(
        "type/feature,#1E90FF,New feature or enhancement"
        "type/bug,#DC143C,Bug fix"
        "type/docs,#32CD32,Documentation"
        "type/maintenance,#9370DB,Code maintenance"
        "epic,#8B4513,Large feature spanning multiple sprints"
    )
    
    # Size labels
    SIZE_LABELS=(
        "size/xs,#E6E6FA,Extra small (1 SP)"
        "size/s,#DDA0DD,Small (2 SP)"
        "size/m,#DA70D6,Medium (3 SP)"  
        "size/l,#FF69B4,Large (5 SP)"
        "size/xl,#FF1493,Extra large (8 SP)"
    )
    
    # Organization level labels
    ORG_LABELS=(
        "strategic/pillar-growth,#FF6347,Growth strategic pillar"
        "strategic/pillar-efficiency,#4682B4,Efficiency strategic pillar"
        "strategic/pillar-innovation,#9932CC,Innovation strategic pillar"
        "cross-repo/dependency,#FF4500,Cross-repository dependency"
        "escalate-to-exec,#B22222,Escalate to executive team"
    )
    
    ALL_LABELS=("${PRIORITY_LABELS[@]}" "${TYPE_LABELS[@]}" "${SIZE_LABELS[@]}" "${ORG_LABELS[@]}")
    
    for repo in "${REPOS[@]}"; do
        echo -e "${BLUE}Processing repository: $repo${NC}"
        
        for label in "${ALL_LABELS[@]}"; do
            IFS=',' read -r name color description <<< "$label"
            gh label create "$name" --color "$color" --description "$description" --repo "$ORG_NAME/$repo" 2>/dev/null || echo "Label $name already exists in $repo"
        done
    done
    
    echo -e "${GREEN}✅ Labels created successfully${NC}"
}

# Function to copy issue templates to repositories
copy_issue_templates() {
    echo -e "${YELLOW}Copying issue templates to repositories...${NC}"
    
    for repo in "${REPOS[@]}"; do
        echo -e "${BLUE}Setting up templates for: $repo${NC}"
        
        # Clone repo temporarily
        git clone "https://github.com/$ORG_NAME/$repo.git" "temp_$repo"
        cd "temp_$repo"
        
        # Create .github directory if it doesn't exist
        mkdir -p .github/ISSUE_TEMPLATE
        
        # Copy templates
        cp ../.github-org-templates/templates/* .github/ISSUE_TEMPLATE/ 2>/dev/null || echo "No templates directory found"
        cp ../.github/ISSUE_TEMPLATE/* .github/ISSUE_TEMPLATE/ 2>/dev/null || echo "Using current templates"
        cp ../.github/pull_request_template.md .github/ 2>/dev/null || echo "No PR template found"
        
        # Commit and push
        git add .github/
        git commit -m "🔧 Add standard issue and PR templates" || echo "No changes to commit for $repo"
        git push origin main || git push origin master
        
        cd ..
        rm -rf "temp_$repo"
    done
    
    echo -e "${GREEN}✅ Issue templates copied successfully${NC}"
}

# Function to create organization-level projects
create_organization_projects() {
    echo -e "${YELLOW}Creating organization-level projects...${NC}"
    
    # Executive Dashboard
    echo "Creating Executive Dashboard project..."
    gh project create --owner "$ORG_NAME" --title "Executive Dashboard 2025" --body "Strategic overview for executive team"
    
    # Portfolio projects
    echo "Creating Frontend Portfolio project..."
    gh project create --owner "$ORG_NAME" --title "Frontend Portfolio" --body "Frontend repositories coordination"
    
    echo "Creating Backend Portfolio project..."
    gh project create --owner "$ORG_NAME" --title "Backend Portfolio" --body "Backend services coordination"
    
    echo "Creating Mobile Portfolio project..."  
    gh project create --owner "$ORG_NAME" --title "Mobile Portfolio" --body "Mobile applications coordination"
    
    echo -e "${GREEN}✅ Organization projects created${NC}"
}

# Function to create repository-level projects
create_repository_projects() {
    echo -e "${YELLOW}Creating repository-level projects...${NC}"
    
    for repo in "${REPOS[@]}"; do
        echo -e "${BLUE}Creating project for: $repo${NC}"
        gh project create --repo "$ORG_NAME/$repo" --title "$repo - Sprint Board" --body "Development sprint board for $repo team"
    done
    
    echo -e "${GREEN}✅ Repository projects created${NC}"
}

# Function to setup milestones
setup_milestones() {
    echo -e "${YELLOW}Setting up milestones...${NC}"
    
    MILESTONES=(
        "Q1 2025 Release,2025-03-31,Major quarterly release"
        "Q2 2025 Release,2025-06-30,Major quarterly release"  
        "Q3 2025 Release,2025-09-30,Major quarterly release"
        "Q4 2025 Release,2025-12-31,Major quarterly release"
    )
    
    for repo in "${REPOS[@]}"; do
        echo -e "${BLUE}Setting up milestones for: $repo${NC}"
        
        for milestone in "${MILESTONES[@]}"; do
            IFS=',' read -r title due_date description <<< "$milestone"
            gh milestone create --repo "$ORG_NAME/$repo" --title "$title" --due-date "$due_date" --description "$description" 2>/dev/null || echo "Milestone $title already exists in $repo"
        done
    done
    
    echo -e "${GREEN}✅ Milestones created successfully${NC}"
}

# Function to display setup instructions
display_instructions() {
    echo -e "${GREEN}"
    echo "🎉 Setup Complete!"
    echo "================"
    echo -e "${NC}"
    echo "Next steps:"
    echo "1. 📋 Configure your organization projects manually in GitHub UI"
    echo "2. 🏷️ Verify labels are applied correctly across repositories"
    echo "3. 📊 Set up GitHub Actions for automation (see automation templates)"
    echo "4. 👥 Assign team members to appropriate projects"
    echo "5. 📈 Configure project views and custom fields"
    echo ""
    echo "Documentation available in:"
    echo "- .github-org-templates/ORGANIZATION_SETUP.md"
    echo "- .github-org-templates/EXECUTIVE_DASHBOARD.md"
    echo "- .github-org-templates/PORTFOLIO_MANAGEMENT.md"
}

# Main execution
main() {
    check_gh_cli
    
    echo "This script will set up project management across your organization."
    echo "Make sure you have admin access to the organization: $ORG_NAME"
    echo ""
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
    
    create_standard_labels
    copy_issue_templates  
    create_organization_projects
    create_repository_projects
    setup_milestones
    display_instructions
}

# Run the main function
main "$@"