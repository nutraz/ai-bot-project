#!/bin/bash
# Script to kill all node processes and restart frontend and backend dev servers

echo "Stopping all node processes..."
pkill -f node

echo "Waiting for ports to free up..."
sleep 2

echo "Starting dev servers..."
npm run dev
