#!/bin/bash
# 자동 배포 스크립트
set -e

echo "Functions 의존성 설치 중..."
cd functions
npm install

echo "Firebase 배포 중..."
cd ..
firebase deploy --only hosting,functions

echo "배포 완료!"
