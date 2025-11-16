#!/usr/bin/env bash
set -euo pipefail

REMOTE_URL="https://github.com/Qaidsaher/rabtee.git"
BRANCH_NAME="work"

function log() {
    printf "[setup-remote] %s\n" "$1"
}

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    :
else
    log "This script must be executed inside a Git repository."
    exit 1
fi

if git config remote.origin.url >/dev/null 2>&1; then
    CURRENT_URL=$(git config remote.origin.url)
    if [[ "$CURRENT_URL" != "$REMOTE_URL" ]]; then
        log "Updating origin remote URL from $CURRENT_URL to $REMOTE_URL"
        git remote set-url origin "$REMOTE_URL"
    else
        log "Origin remote already points to $REMOTE_URL"
    fi
else
    log "Adding origin remote $REMOTE_URL"
    git remote add origin "$REMOTE_URL"
fi

if git fetch origin "$BRANCH_NAME" >/dev/null 2>&1; then
    log "Fetched branch $BRANCH_NAME from origin."
else
    log "Branch $BRANCH_NAME not found on origin or fetch failed; continuing."
fi

if git rev-parse --verify "$BRANCH_NAME" >/dev/null 2>&1; then
    if git branch --set-upstream-to="origin/$BRANCH_NAME" "$BRANCH_NAME" >/dev/null 2>&1; then
        log "Branch $BRANCH_NAME is now tracking origin/$BRANCH_NAME."
    else
        log "Unable to set upstream automatically. You may need to push the branch with 'git push -u origin $BRANCH_NAME'."
    fi
else
    log "Local branch $BRANCH_NAME does not exist; skipping upstream configuration."
fi

log "Remote configuration complete."
