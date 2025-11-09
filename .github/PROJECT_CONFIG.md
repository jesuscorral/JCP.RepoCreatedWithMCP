# 🎯 Project Management Configuration
# TODO List MVP - Scrum Configuration

## 📊 Sprint Configuration
SPRINT_DURATION: 2 weeks
STORY_POINTS_SCALE: Fibonacci (1, 2, 3, 5, 8, 13)
VELOCITY_TARGET: 20-25 story points per sprint
TEAM_CAPACITY: 40 hours per sprint

## 🏷️ Label System
### Priority Labels
priority/critical: Issues that block release
priority/high: Important features or serious bugs  
priority/medium: Standard features and minor bugs
priority/low: Nice to have features

### Type Labels  
type/feature: New functionality
type/bug: Bug fixes
type/docs: Documentation changes
type/maintenance: Code maintenance and refactoring
epic: Large features spanning multiple sprints

### Size Labels (Story Points)
size/xs: 1 SP - Simple tasks (< 2 hours)
size/s: 2 SP - Small features (2-4 hours)  
size/m: 3 SP - Medium features (4-8 hours)
size/l: 5 SP - Large features (1-2 days)
size/xl: 8 SP - Very large features (2-3 days)

### Component Labels
frontend: Frontend/UI related
backend: Backend/API related  
database: Database related
deployment: DevOps/deployment related

## 🎯 Definition of Done
- [ ] Code implemented according to acceptance criteria
- [ ] Code reviewed by at least 1 team member
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] No critical or high priority bugs
- [ ] Performance requirements met
- [ ] Accessibility requirements met (WCAG AA)
- [ ] Security review completed (for sensitive changes)
- [ ] Deployed to staging environment
- [ ] Product Owner approval

## 🔄 Workflow States
1. **Backlog**: Items not yet ready for development
2. **Ready**: Items ready for development (refined, estimated)
3. **In Progress**: Currently being worked on
4. **Review**: Code review in progress
5. **Testing**: QA testing in progress
6. **Done**: Completed and deployed

## 📅 Ceremony Schedule
### Daily Standup
- **When**: Every day at 9:00 AM
- **Duration**: 15 minutes max
- **Participants**: Development team
- **Format**: What did I do yesterday? What will I do today? Any blockers?

### Sprint Planning  
- **When**: First day of sprint
- **Duration**: 2 hours for 2-week sprint
- **Participants**: Full team
- **Output**: Sprint backlog, sprint goal

### Sprint Review
- **When**: Last day of sprint  
- **Duration**: 1 hour
- **Participants**: Team + stakeholders
- **Output**: Demo, feedback, updated product backlog

### Sprint Retrospective
- **When**: After sprint review
- **Duration**: 45 minutes
- **Participants**: Development team
- **Output**: Action items for improvement

### Backlog Refinement
- **When**: Mid-sprint
- **Duration**: 1 hour
- **Participants**: Team + Product Owner  
- **Output**: Refined backlog items for next sprint

## 📊 Metrics to Track
- Velocity (story points per sprint)
- Burn-down/Burn-up charts
- Cycle time (time from start to done)
- Lead time (time from request to delivery)
- Code review time
- Bug escape rate
- Technical debt ratio
- Team satisfaction score

## 🚨 Escalation Process
1. **Blockers**: Immediately flag in daily standup
2. **Scope changes**: Discuss with Product Owner
3. **Technical issues**: Consult with tech lead
4. **External dependencies**: Escalate to Scrum Master
5. **Critical bugs**: Immediate escalation to Product Owner

## 🎯 Sprint Goals Examples
- Sprint 1: "Complete backend MVP with basic CRUD operations"
- Sprint 2: "Deliver working frontend with core TODO functionality"
- Sprint 3: "Achieve production-ready application with deployment"

## 📋 Story Templates
### User Story Format
As a [type of user], I want [an action] so that [a benefit/value].

### Epic Format  
As a [type of user], I want [high-level goal] so that [business value].

## 🔍 Acceptance Criteria Guidelines
- Use clear, testable statements
- Include positive and negative scenarios
- Specify UI/UX requirements
- Include performance requirements
- Define error handling behavior