#!/usr/bin/env bash

if scripts/ensure-dist.sh; then
  npm run storybook 
fi
