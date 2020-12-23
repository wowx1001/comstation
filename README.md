# Sending station & Relay station WebPage

## 전국 송신소 / 중계소 시각화 웹  

## 실행 방법(아마존 ec2 클라우드 이용)

#### &nbsp;&nbsp;&nbsp;&nbsp; 1. python 또는 conda 설치 (구글 검색 : AWS EC2에 플라스크 클라우드 웹 서버 구축하기)
#### &nbsp;&nbsp;&nbsp;&nbsp; 2. 클라우드에 git 설치 / git 설치 명령어 : sudo apt install git
#### &nbsp;&nbsp;&nbsp;&nbsp; 3. git 설치후 클라우드 환경에서 git clone https://github.com/wowx1001/comstation 타이핑
#### &nbsp;&nbsp;&nbsp;&nbsp; 4. https://apis.map.kakao.com/ 에서 카카오 맵 api 키 발급후 templates/main.html에 api키를 수정
#### &nbsp;&nbsp;&nbsp;&nbsp; 5. https://developers.kakao.com/ -> 내 애플리케이션 -> 플랫폼에서 web 애플리케이션을 추가
#### &nbsp;&nbsp;&nbsp;&nbsp; 6. 사이트 도메인에 ec2 ipv4 주소와 포트를 추가.(ex.http://127.0.0.1:5000)
#### &nbsp;&nbsp;&nbsp;&nbsp; 7. 클라우드 환경 root directory에서 source flask/bin/activate 타이핑 -> 프로젝트 폴더에서 python3 main.py 타이핑
#### &nbsp;&nbsp;&nbsp;&nbsp; 8. 서버가 켜지면 웹브라우저에서 ipv4 주소와 포트를 입력하여 접속 (ex. http://0.0.0.0:5000)

## 실행 결과
<img src="https://github.com/wowx1001/comstation/blob/master/screenshot/shot1.png?raw=true"></img>
<img src="https://github.com/wowx1001/comstation/blob/master/screenshot/shot2.png?raw=true"></img>  
<img src="https://github.com/wowx1001/comstation/blob/master/screenshot/shot3.png?raw=true"></img>
