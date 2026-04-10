#!/bin/bash

# ELIM Project Startup Script
echo "🏛️  Starting ELIM Church Website Project..."
echo "==========================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Build and start all services
echo "🏗️  Building and starting all services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "🎉 ELIM Project is now running!"
echo ""
echo "📱 Frontend (React):  http://localhost:3000"
echo "🔧 Backend (Django):  http://localhost:8000"
echo "🔗 API Docs:          http://localhost:8000/admin"
echo ""
echo "📊 Database:          PostgreSQL on port 5432"
echo "📮 Redis:             Redis on port 6379"
echo ""
echo "To stop the project, run:"
echo "  docker-compose down"
echo ""
echo "To view logs, run:"
echo "  docker-compose logs -f [service_name]"
echo ""
echo "Happy coding! 🚀"
