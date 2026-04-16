---
title: "SQUAD + GitHub Issues Workflow"
description: "Automate issue triage, assignment, and delivery with SQUAD and GitHub Actions"
authors: ["marconsilva"]
category: "Agentic Software Development"
industry: "Cross-Industry"
services: []
languages: ["TypeScript"]
frameworks: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Tailwind CSS"]
modernizationTools: []
agenticTools: ["SQUAD", "GitHub Copilot Agent"]
tags: ["github-actions", "issue-automation", "developer-forum", "workflow-automation", "triage"]
extensions: ["github.copilot"]
thumbnail: ""
video: ""
version: "1.0.0"
---

## Overview

This lab demonstrates how to automate issue triage, assignment, and delivery using SQUAD agents with GitHub Actions. The target codebase is a developer forum application built with Next.js 14 and tRPC.

## Understanding the Current Application

The DevConnect developer forum application is a Next.js 14 + tRPC monorepo serving as the target codebase for SQUAD automation workflows.

The main homepage displays the Q&A community feed with recent questions, vote counts, answer counts, and view metrics:

![Homepage](assets/screenshots/homepage.png)

### Content & UI Components

The questions list shows all three sample questions rendered from the in-memory tRPC API — an auth question, a search bug report, and a performance issue:

![Questions List](assets/screenshots/questions-list.png)

Each question card shows title, description, and engagement stats (votes, answers, views):

![Question Card](assets/screenshots/question-card.png)

### Responsive Design

The application features a responsive layout. Below is the mobile view on a 375×812 viewport:

![Mobile View](assets/screenshots/mobile-view.png)

The DevConnect header with app name and tagline adapts across breakpoints:

![Header Branding](assets/screenshots/header-branding.png)

## Screenshots Reference

| Screenshot | Description |
|---|---|
| ![Homepage](assets/screenshots/homepage.png) | Desktop homepage with Q&A feed |
| ![Questions List](assets/screenshots/questions-list.png) | Full questions list |
| ![Question Card](assets/screenshots/question-card.png) | Individual question card |
| ![Mobile View](assets/screenshots/mobile-view.png) | Mobile responsive layout |
| ![Header Branding](assets/screenshots/header-branding.png) | Header branding component |

## Solution Guide

The `solution-final` branch contains the complete implementation. Each step is tagged for easy navigation.

### Step 1: Explore the Application (`step-01-explore-application`)

Installed dependencies and explored the DevConnect monorepo structure:
- **Frontend:** Next.js 14 with App Router at `packages/web/` (port 3000)
- **Backend:** tRPC on Express at `packages/api/` (port 3001)
- **Shared types:** Zod schemas at `packages/shared/`
- **Database:** Prisma schema with Question, Answer, Tag models (soft delete support)
- **Existing CI:** GitHub Actions workflow for lint/build/test
- **Issue templates:** Bug report, feature request, documentation (all with `needs-triage` label)

### Step 2: Set Up SQUAD Configuration (`step-02-squad-configuration`)

Created `.squad/` directory with team and agent configurations:

```
.squad/
├── team.yml          # Team config with 4 agents and settings
└── agents/
    ├── brain.yml     # Triage rules, classification, output templates
    ├── hands.yml     # Implementation rules, branch/PR conventions
    ├── eyes.yml      # Review checklist (quality, security, testing, perf)
    └── mouth.yml     # Documentation rules, changelog format
```

Key settings: human approval required, auto-merge disabled, max 3 concurrent tasks, T-shirt effort sizing.

### Step 3: Configure Issue Templates (`step-03-issue-templates`)

Enhanced existing templates and added new ones for SQUAD parsing:

| Template | Key Additions |
|----------|---------------|
| `bug_report.yml` | Affected Component dropdown, Environment field, SQUAD Context |
| `feature_request.yml` | Target Component, Priority dropdown, Acceptance Criteria |
| `documentation.yml` | Related Component, Current Documentation State |
| `squad-task.yml` (NEW) | Task Type, Preferred Agent, Acceptance Criteria, Files to Modify |
| `config.yml` (NEW) | Blank issues disabled, link to workflow docs |

### Step 4: Create Workflow Automation (`step-04-workflow-automation`)

Built 4 GitHub Actions workflows and 3 SQUAD workflow definitions:

**GitHub Actions:**
| Workflow | Trigger | Agent |
|----------|---------|-------|
| `squad-triage.yml` | `issues.opened` | Brain — parse, classify, estimate, label, comment |
| `squad-implement.yml` | `issues.labeled[approved]` | Hands — branch, implement, PR |
| `squad-review.yml` | `pull_request.opened` | Eyes — lint, test, build, review |
| `squad-docs.yml` | `pull_request.closed[merged]` | Mouth — changelog, docs |

**SQUAD Workflows:**
| Definition | Pipeline |
|------------|----------|
| `issue-triage.yml` | parse → classify → estimate → plan → assign → label → comment |
| `issue-to-pr.yml` | fetch-plan → branch → implement → test → create-pr → notify |
| `review-cycle.yml` | code-review (Eyes) → human checkpoint → documentation (Mouth) |

### Step 5: Define Agent-Issue Mapping (`step-05-agent-issue-mapping`)

Created `.squad/agent-issue-mapping.yml` with 6 routing pipelines:

1. **Bug Fix** → Brain triage → Hands fix (require tests + reproduction) → Eyes review
2. **Feature** → Brain triage → Hands implement (require acceptance criteria) → Eyes review
3. **Documentation** → Brain triage → Mouth write → Eyes review
4. **Performance** → Brain triage (require profiling) → Hands optimize (require benchmark) → Eyes review
5. **Security** → Brain triage (auto-critical, notify) → Hands fix (security review) → Eyes review
6. **SQUAD Task** → Brain triage → Preferred agent → Eyes review

Label system: 5 type labels, 4 priority levels, 5 effort sizes, 4 agent labels, 7 status labels.

### Step 6: Test the Pipeline (`step-06-test-pipeline`)

Simulated 3 sample issues through the complete pipeline:

| Issue | Type | Brain Triage | Hands PR | Eyes Review |
|-------|------|-------------|----------|-------------|
| #7 Search shows deleted posts | Bug (High) | Effort: S | PR #8 (2 files) | ✅ Approved |
| #9 Syntax highlighting | Feature (Medium) | Effort: L | PR #10 (4 files) | ✅ Approved |
| #11 Slow page load | Performance (High) | Effort: L | PR #12 (5 files) | 🔄→✅ Re-approved |

Pipeline metrics: 9 workflow runs, ~5 min total (excluding human wait), 100% success rate.

### Step 7: Document the Integration (`step-07-document-integration`)

Created `docs/INTEGRATION-GUIDE.md` with:
- Architecture diagram (ASCII pipeline flow)
- Component reference tables (agents, workflows, templates)
- Detailed workflow phases (6 steps with human gates)
- Label system documentation
- Usage guide and manual dispatch commands
- Troubleshooting reference

### Pipeline Architecture

```
NEW ISSUE → 🧠 Brain Triage → 👤 Human Approve → 🤖 Hands Implement
    → 👁️ Eyes Review → 👤 Human Merge → 📢 Mouth Docs → ISSUE CLOSED
```

### CLI Outputs

Step outputs are available in `assets/outputs/`:
- `step-01-explore-application.txt`
- `step-02-squad-configuration.txt`
- `step-03-issue-templates.txt`
- `step-04-workflow-automation.txt`
- `step-05-agent-issue-mapping.txt`
- `step-06-test-pipeline.txt`
- `step-07-document-integration.txt`
