/*
 * 코스어가 되어버려 채팅방 전용 봇
 * Version 5.7
 */

var bot = BotManager.getCurrentBot();

// 버전, 정보, 관리자상수화 등
var VERSION = "5.7";
var TARGET_ROOM = "코스어가 되어버려✨";
var ADMIN_NAMES = ["권재현", "한유"];

// 파일
var FILE_USER_MAP = "user_map.txt";
var FILE_USER_DATA = "user_data.txt";
var FILE_ATTENDANCE = "attendance_today.txt";
var FILE_FORTUNE = "fortune_today.txt";
var FILE_RECRUIT = "recruit_data.txt";

// 
//  정적 데이터
// 
var foodList = [
    "비빔밥", "불고기", "김치찌개", "된장찌개", "순두부찌개", "갈비탕", "설렁탕", "육개장", "삼계탕", "닭볶음탕",
    "보쌈", "족발", "제육볶음", "고등어조림", "갈치조림", "김치볶음밥", "볶음밥", "참치김밥", "치즈김밥", "돈까스",
    "치즈돈까스", "우동", "냉면", "물냉면", "비빔냉면", "잔치국수", "칼국수", "쫄면", "떡볶이", "순대",
    "오뎅", "라면", "참깨라면", "김치라면", "짜장면", "짬뽕", "마라탕", "샤브샤브", "스시", "연어덮밥",
    "규동", "텐동", "가츠동", "라멘", "우나기동", "차슈라멘", "피자", "치킨", "양념치킨", "후라이드치킨",
    "간장치킨", "마늘치킨", "핫윙", "버팔로윙", "파스타", "토마토파스타", "크림파스타", "알리오올리오", "라자냐", "리조또",
    "스테이크", "함박스테이크", "샐러드", "샌드위치", "햄버거", "불고기버거", "치즈버거", "더블치즈버거", "감자튀김", "핫도그",
    "토스트", "오므라이스", "김말이튀김", "군만두", "고로케", "베이컨덮밥", "닭갈비", "철판볶음밥", "삼겹살", "목살구이",
    "돼지불백", "차돌박이", "양꼬치", "곱창전골", "막창구이", "해물파전", "부추전", "계란말이", "소세지볶음", "참치마요덮밥",
    "우엉조림", "버섯전골", "새우튀김", "해물찜", "회덮밥", "알밥", "쭈꾸미볶음", "낙지덮밥", "돌솥비빔밥", "도시락",
    "도루묵구이", "청국장", "코다리조림", "에그마요 샌드위치", "소세지 도시락", "미트볼 스파게티", "피자토스트", "치킨너겟",
    "옥수수버터구이", "계란볶음밥", "스팸구이", "치즈스틱", "베이컨말이", "모짜렐라치즈핫도그", "콘치즈", "감자범벅",
    "크림리조또", "스위트콘전", "스마일감자", "에그스크램블", "스크램블 토스트", "햄치즈토스트", "치즈오믈렛", "카레라이스",
    "떡갈비", "유부초밥", "치킨마요덮밥", "베이컨김치볶음밥", "누룽지탕", "베이비파스타", "플레인우동", "미니핫도그",
    "수제피자", "후라이드만두", "치킨까스", "어린이돈까스", "냉모밀", "치즈볶음밥", "감자치즈볼", "푸딩젤리도시락"
];

var dessertList = [
    "초코 케이크", "치즈 케이크", "딸기 생크림 케이크", "레드벨벳 케이크", "녹차 케이크", "당근 케이크", "밀크레이프",
    "크렘브륄레", "티라미수", "마카롱", "휘낭시에", "마들렌", "에클레어", "슈크림", "푸딩", "젤리", "타르트",
    "레몬 타르트", "애플파이", "브라우니", "머핀", "초코칩 쿠키", "오레오 쿠키", "수제쿠키", "찹쌀떡", "인절미",
    "약과", "호떡", "붕어빵", "계란빵", "꽈배기", "와플", "아이스크림", "바닐라 아이스크림", "초코 아이스크림",
    "녹차 아이스크림", "젤라또", "빙수", "팥빙수", "망고빙수", "딸기빙수", "연유토스트", "허니브레드", "크로플",
    "팬케이크", "롤케이크", "콩떡", "도넛", "카라멜 푸딩", "타피오카 버블", "탕후루"
];

var fortunes = [
    "🌞 태양이 당신을 비추는 하루입니다. 걱정했던 일들이 생각보다 순조롭게 풀릴 것입니다.",
    "🌕 달빛이 유난히 밝은 날, 오래된 인연에게서 반가운 소식이 찾아옵니다.",
    "🍀 오늘의 키워드는 '긍정'. 말 한마디가 큰 행운으로 되돌아옵니다.",
    "💧 눈앞의 문제는 당신의 인내심을 시험할 뿐입니다. 끝까지 버티면 길이 열립니다.",
    "🌿 사람들과의 대화 속에서 뜻밖의 아이디어를 얻게 됩니다.",
    "🌈 지갑보다 마음을 먼저 열면 뜻밖의 보상이 돌아옵니다.",
    "💎 작게 시작한 일이 큰 결실로 이어질 징조가 보입니다.",
    "🎯 목표를 구체적으로 세워보세요. 우주는 계획이 있는 사람을 돕습니다.",
    "🔥 잠시 불편하더라도 오늘의 도전은 내일의 성장을 만듭니다.",
    "🍎 잊고 있던 약속이 다시 찾아올 수 있습니다. 기억을 더듬어보세요.",
    "🌤️ 오후쯤, 당신의 노력에 대한 인정이 찾아올 수 있습니다.",
    "🪞 스스로를 돌아볼 시간입니다. 거울 속의 당신이 답을 알고 있습니다.",
    "🕊️ 마음이 가벼워질수록 운의 흐름도 부드러워집니다.",
    "💫 불확실한 상황일수록, 당신의 직감이 가장 정확합니다.",
    "⚖️ 오늘은 균형이 중요합니다. 과유불급을 명심하세요.",
    "🌻 새로운 인연이 다가오지만, 성급히 판단하지 마세요.",
    "🕯️ 평소보다 집중력이 높아집니다. 오늘은 공부나 연구에 적합한 날입니다.",
    "🎲 모험을 피하지 마세요. 확률은 당신 편입니다.",
    "🌌 어제의 고민이 오늘은 답이 되어 돌아옵니다.",
    "🍃 바람이 부는 날, 당신의 결정이 한층 가벼워집니다.",
    "🏝️ 휴식이 필요한 시점입니다. 잠깐의 쉼이 더 큰 효율을 줍니다.",
    "🌹 호감 있는 사람에게서 좋은 반응을 기대할 수 있습니다.",
    "📚 오늘 배운 작은 지식이 가까운 시일 내 큰 도움이 됩니다.",
    "🎁 생각지도 못한 선물이나 제안을 받을 수 있습니다.",
    "🧭 방향을 잃었다면 잠시 멈춰보세요. 길은 다시 보일 것입니다.",
    "⚡ 번뜩이는 아이디어가 찾아옵니다. 반드시 메모하세요.",
    "🫖 따뜻한 대화가 냉랭했던 관계를 녹입니다.",
    "📅 일정을 조금 비워두세요. 좋은 일이 들어올 자리를 만들어야 합니다.",
    "🪄 평범한 일상 속에서도 마법 같은 일이 생길 수 있습니다.",
    "🌠 잠시 멍하니 하늘을 바라보세요. 행운의 별이 지나갑니다.",
    "🎈 불안은 당신을 시험하기 위한 신호일 뿐입니다. 곧 사라질 것입니다.",
    "🧘 마음을 다스리면 몸도 따라옵니다. 오늘은 정신의 날입니다.",
    "🌙 저녁 무렵 뜻밖의 연락이 찾아옵니다. 반가운 소식이네요.",
    "📦 버려야 채워집니다. 정리한 만큼 새 운이 들어옵니다.",
    "🍇 건강한 식사가 행운의 시작입니다. 오늘은 몸을 먼저 챙기세요.",
    "🪁 계획에 없던 외출이 좋은 인연을 부를 수 있습니다.",
    "🎵 음악이 행운의 신호를 전합니다. 즐겨 듣는 노래를 틀어보세요.",
    "🧩 문제의 조각이 맞춰지는 날입니다. 끝까지 집중하세요.",
    "🔑 열쇠는 이미 당신 손에 있습니다. 자신감을 가지세요.",
    "📖 오래된 기록 속에 해답이 숨어 있습니다. 과거를 돌아보세요.",
    "🌊 감정의 파도에 휩쓸리지 마세요. 중심을 잡으면 기회가 보입니다.",
    "🏃‍♀️ 조금만 더 달려보세요. 결승선이 생각보다 가깝습니다.",
    "🌻 오늘의 행운 색상은 노란색입니다. 밝은 옷이 좋은 기운을 불러옵니다.",
    "💬 뜻밖의 칭찬이 당신을 웃게 할 것입니다.",
    "🕊️ 잃어버린 평화를 되찾게 됩니다. 주변의 소음에서 벗어나세요.",
    "🌅 이른 아침, 좋은 소식이 찾아옵니다.",
    "💡 아이디어를 행동으로 옮기면 금전운이 따릅니다.",
    "🪶 가벼운 마음이 오늘을 쉽게 만듭니다. 너무 무겁게 생각하지 마세요.",
    "🌠 별이 당신 편입니다. 오늘은 당신이 주인공입니다."
];

var quotes = [
    "성공은 작은 노력을 반복한 결과이다. - 로버트 콜리어",
    "실패는 성공으로 가는 배움이다. - 필립 나이트",
    "기회는 준비된 자에게만 미소 짓는다. - 루이 파스퇴르",
    "인내는 쓰지만 그 열매는 달다. - 장 자크 루소",
    "성공은 실패 후에도 계속할 용기다. - 윈스턴 처칠",
    "행복은 방향이지 목적지가 아니다. - 칼 로저스",
    "지금의 당신도 누군가의 꿈이다. - 익명",
    "할 수 있다고 믿는 순간 절반은 이룬 것이다. - 시어도어 루즈벨트",
    "모든 위대한 일은 작은 용기에서 시작된다. - 헨리 포드",
    "성공의 반대는 실패가 아니라 포기다. - 크리스 그로서",
    "SNS는 인생의 낭비다. - 알렉스 퍼거슨",
    "명언을 읽는다고 인생이 변하진 않는다. - 냉소주의자",
    "성공하고 싶다면 일단 일어나라. - 에디슨 풍자",
    "명언 찾을 시간에 공부해라. - 현실적인 조언",
    "불가능은 단지 의견일 뿐이다. - 무하마드 알리",
    "도전하지 않으면 아무것도 얻지 못한다. - 셰익스피어",
    "성공은 준비와 기회의 만남이다. - 오프라 윈프리",
    "인생은 짧다. 하지만 웃음은 길게 남는다. - 찰리 채플린",
    "오늘 걱정한다고 내일이 바뀌진 않는다. - 현실",
    "할 일은 많은데, 걱정할 시간은 없다. - 현실주의자",
    "명언보다 중요한 건 네 할 일이다. - 현실",
    "인생은 고통을 피하는 법이 아니라, 그 안에서 의미를 찾는 법이다. - 빅터 프랭클",
    "기회는 두드리지 않는다. 직접 만들어라. - 조지 버나드 쇼",
    "좋은 일은 느리게 온다. 빠른 건 대개 광고다. - 인터넷 밈",
    "명언을 모으는 대신 명언이 되어라. - 익명",
    "무엇이든 시작하는 자에게 세상은 길을 내준다. - 에머슨",
    "모두가 멈출 때 한 발 더 가라. - 나폴레옹",
    "어제보다 나은 오늘이면 충분하다. - 현실주의 명언",
    "걱정은 내일의 문제를 해결하지 못하지만, 오늘의 평화를 빼앗는다. - 리처드 칼슨",
    "스스로를 믿는 순간, 다른 사람의 시선은 사라진다. - 미상",
    "패배는 끝이 아니다. 배움의 시작이다. - 마이클 조던",
    "명언은 좋지만, 실천은 더 좋다. - 누군가의 진심",
    "성공은 노력의 습관이다. - 아리스토텔레스",
    "당신의 속도는 중요하지 않다. 멈추지만 마라. - 공자식 현실 버전",
    "실패를 두려워하면 성공도 두려워진다. - 익명",
    "명언 찾다가 하루 간다. 그냥 해라. - 선배의 조언",
    "성공은 열심히 하는 사람의 것이 아니라, 포기하지 않는 사람의 것이다. - 루이스 캐럴",
    "인생의 가장 큰 위험은 위험을 감수하지 않는 것이다. - 마크 주커버그",
    "계획이 없다면, 남의 계획 속에서 살게 될 것이다. - 짐 론",
    "지금 하는 일에 집중하라. 그것이 미래를 만든다. - 달라이 라마",
    "누구도 널 구하러 오지 않는다. 이건 영화가 아니다. - 현실 종결자",
    "현실을 인정하는 순간, 인생이 시작된다. - 냉철한 결론",
    "결국 아무도 네 인생을 대신 살아주지 않는다. - 궁극의 팩트",
    "운명 탓은 게으름의 시적 표현이다. - 냉소적 진실",
    "네가 진짜로 원한다면, 이미 움직였을 것이다. - 직설의 미학"
];

var QUIZ_BANK = [
    { q: "[001] [넌센스] 화장실이 둥둥 떠있으면?", a: ["공중화장실"], hint: "ㄱㅈ화장실 이라고 하죠" },
    { q: "[002] [넌센스] 전화기가 둥둥 떠있으면?", a: ["공중전화", "공중전화기"], hint: "가로변에 설치되어 있는 전화기입니다. 법률에 따라 지정된 사회기반시설 중 하나로서, 이용률이 적어도 완전히 철거하지 않습니다." },
    { q: "[003] [넌센스] 카트에 만두가 있으면 뭘까?", a: ["카트만두"], hint: "네팔의 수도입니다." },
    { q: "[004] [넌센스] 소가 번개에 맞아 죽으면 뭘까? (5음절)", a: ["우사인볼트"], hint: "운동선수 이름입니다." },
    { q: "[005] [넌센스] '비가 1시간 동안 내린다'를 다른말로 뭐라고 할까? (붙여서 쓸 것)", a: ["추적60분"], hint: "KBS 방송 프로그램 이름입니다." },
    { q: "[006] [IT] 계산하다(Compute)에서 유래된 단어로, 과거에는 '계산하는 사람'을 칭하는 말이었다. 지금은 자동화된 이 기기도 이 단어로 칭하는데, 이 단어는 무엇인가?", a: ["컴퓨터", "Computer"], hint: "🧑‍💻" },
    { q: "[007] [넌센스] 세상에서 제일 예쁜 풀은?", a: ["뷰티풀"], hint: "남자들이 이걸로 드립치죠. 얼굴에 풀 묻었다고." },
    { q: "[008] [넌센스] 화상입고 하는 전화는?", a: ["화상전화"], hint: "얼굴을 보고 전화를 하는걸 이거라고 하죠." },
    { q: "[009] [넌센스] D가 20개씩 있으면 뭘까?", a: ["스무디"], hint: "언 과일과 얼음을 갈아서 먹는 베버리지입니다." },
    { q: "[010] [넌센스] 소가 불에 타면?", a: ["불소"], hint: "치아에 이걸 코팅하면 충치를 예방할 수 있다고 알려져 있습니다." },
    { q: "[011] [넌센스] 호주에서 쓰는 돈은?", a: ["호주머니"], hint: "호주달러는 아닙니다. 호주가 들어가는건 맞아요." },
    { q: "[012] [넌센스 X IT] USA 다음은?", a: ["USB"], hint: "범용직렬버스라고 불리우는 것입니다." },
    { q: "[013] [넌센스] '성씨가 똑같다'를 3글자로 줄이면?", a: ["성동일"], hint: "유명인 이름입니다." },
    { q: "[014] [넌센스] 혀가 거짓말할 때 쓰는 말은? (붙여서 쓸 것, 기호는 쓰지말것)", a: ["전혀아닙니다"], hint: "극구 부정할 때 쓰는 말이기도 합니다." },
    { q: "[015] [넌센스] 슈퍼주니어 신동 옆에 있으면 뭐라고 할까? (3글자)", a: ["신동엽"], hint: "SNL에 자주 나오는 유명인 이름입니다." },
    { q: "[016] [넌센스] 과자가 자기소개하면? (3글자)", a: ["전과자"], hint: "범죄를 저지른 이력이 있는 사람" },
    { q: "[017] [IT X 수학] [난이도 최상] 16진수 A 는 10진수로 몇인가?", a: ["10", "열", "십"], hint: "16진수로 B는 10진수로 11입니다." },
    { q: "[018] [넌센스] 입모양이 S자인 사람을 뭐라고 할까? (영어 대문자, 3음절)", a: ["EBS", "이비에스"], hint: "한국교육방송공사의 영어 약어입니다." },
    { q: "[019] [수학] π(파이)는 몇도일까?", a: ["180", "180도"], hint: "원의 둘레를 구하는 공식은 2πr로, 2π는 360도를 뜻합니다." },
    { q: "[020] [IT] macOS 에서는 ctrl(Control) 키를 거의 사용하지 않는데, 그렇다면 ctrl 키 대신 어떤 키를 사용하나?\n보기에서 골라쓰시오.\n\n[보기] Command | Alternative Key (Alt) | Function Key (Fn) | Escape Key (ESC)", a: ["Command", "커멘드", "코멘드"], hint: "Command + C 는 복사입니다." },
    { q: "[021] [넌센스] 양이 돈을 벌어서 내는 세금은 뭘까? (5글자)", a: ["양도소득세"], hint: "재화를 양도할 때 내는 세금입니다." },
    { q: "[022] [넌센스] 할아버지가 등산하면?", a: ["산타할아버지"], hint: "호호호" },
    { q: "[023] [넌센스] '할아버지! 산에서 불이나요!'를 6글자로 줄이면?", a: ["산타할아버지"], hint: "호호호" },
    { q: "[024] [넌센스] 쟤는 포도다! 를 3글자로 줄이면?", a: ["포도당"], hint: "당 중의 하나입니다." },
    { q: "[025] [넌센스] 햄버거의 색깔은?", a: ["버건디"], hint: "색깔 이름입니다." },
    { q: "[026] [넌센스] 소가 그림을 그리면?", a: ["피카소"], hint: "소로 끝나는 유명 화가 이름입니다." },
    { q: "[027] [넌센스] 소는 어디에서 쉴까?", a: ["휴게소"], hint: "일반적으로 고속도로에 있어요." },
    { q: "[028] [넌센스] 세상에서 가장 쉬운 숫자는? (답 입력시 숫자만 입력)", a: ["190000"], hint: "아라비아숫자로 입력하세요." },
    { q: "[029] [넌센스] 트가 아프면 아파트, 근데 트는 어디가 아플까?", a: ["배란다", "베란다"], hint: "아래층의 지붕 공간을 활용해 건물 외부에 돌출된 옥외 공간으로, 통상 1층 면적이 2층보다 클 때 2층에 생기는 바닥(루프 테라스)을 의미합니다." },
    { q: "[030] [IT] EMV Contactless 기반의 비접촉 결제 시스템으로, Apple에서 서비스 하고 있는 결제 서비스는 무엇인가?", a: ["애플페이", "Apple Pay"], hint: "Apple 지갑 앱에서 결제할 수 있는 서비스입니다." },
    { q: "[031] [IT] UNIX 기반의 휴대전화용 OS로서, Apple社의 iPhone에 탑재된 OS의 이름은 무엇인가?", a: ["iOS", "아이오에스", "iPhoneOS"], hint: "옛 이름은 iPhone OS 입니다." },
    { q: "[032] [IT] Linux 기반의 오픈소스 휴대전화용 OS로서, 현재는 Google이 인수하여 서비스하고 있는 OS의 이름은 무엇인가?", a: ["Android", "안드로이드"], hint: "삼성 갤럭시에 탑재된 모바일 기기 운영체제 이름입니다." },
    { q: "[033] [영어 X IT] What is the name of the app we are currently chatting on?", a: ["KakaoTalk", "카카오톡", "카톡"], hint: "번역: 우리 지금 무슨 앱으로 채팅치고 있나요?" },
    { q: "[034] [국어] '수도' (Capital City)를 뜻하는 다른 말로, 대한민국의 수도 지명이기도 한 이 단어는 무엇인가?", a: ["서울", "서울특별시", "서울시"], hint: "예문: 미국의 서울은 워싱턴DC입니다." },
    { q: "[035] [철도] 인천역에서 출발하여 서울 영등포역까지 이어지는 이 노선의 이름은 무엇인가?", a: ["경인선"], hint: "대한민국 최초의 철도노선이며, 서울 경(京) + 어질/인천 인(仁)을 따서 만든 노선입니다." },
    { q: "[036] [IT] 웹사이트에서 페이지를 찾을 수 없을 때 뜨는 오류 코드로, KiiKii(키키)가 해당 코드를 기반하여 만든 노래로 큰 이슈를 끈 바 있다. 400번대 오류코드인데, 정확한 코드는 몇 번인가? (400~404 중 하나 선택)", a: ["404", "404번"], hint: "객관식은 힌트를 제공하지 않아요." },
    { q: "[037] [IT] Compact Disc 의 약자로서, 원판에 레이저로 정보를 저장하고 읽는 매체를 무엇이라고 하는가?", a: ["CD", "씨디"], hint: "이 매체에다가 기록하는 행위를 '버닝' (굽기) 라고 합니다. 사실 Compact Disk의 이니셜을 쓰면 그게 정답입니다." },
    { q: "[038] [IT X 수학] [난이도 최상] 16진수 F 는 10진수로 몇인가?", a: ["15", "십오", "열다섯"], hint: "16진수로 E는 10진수로 14 입니다." },
    { q: "[039] [IT] 보조기억장치의 종류 중 하나로, 여러 겹의 딱딱한 원판(Disk)에 자석 신호로 정보를 저장하는 매체는 무엇인가?", a: ["하드디스크드라이브", "HDD", "하드", "하드디스크"], hint: "딱딱한 (Hard) 원판(Disk) 저장매체(Drive)" },
    { q: "[040] [IT] 이한봇이 사용하고 있는 스크립트 언어로, 이 언어는 무엇인가? 보기에서 골라 답하시오.\n\n[보기] JavaScript | Java | Python", a: ["JS", "자바스크립트", "JavaScirpt"], hint: "보기가 제공된 문제에서는 힌트를 제공하지 않습니다." },
    { q: "[041] [헌터X헌터] 그리드 아일랜드(G.I)에서 곤과 키르아의 수행을 도운, 귀여운 외모 속에 근육질 본모습을 숨긴 스승은?", a: ["비스케", "비스킷", "비스킷 크루거", "Bisky"], hint: "변화계 능력자로, '매지컬 에스테' 능력을 사용합니다." },
    { q: "[042] [헌터X헌터] 개미편에서 왕 메르엠과 '군기'를 두며 교감을 나누었던 눈먼 소녀의 이름은?", a: ["코무기", "Komugi"], hint: "군기의 세계 챔피언으로, 왕의 심경 변화에 큰 영향을 미칩니다." },
    { q: "[043] [헌터X헌터] 네테로 회장의 넨 능력으로, 거대한 불상을 소환해 공격하는 기술의 이름은?", a: ["백식관음", "햐쿠시키칸논"], hint: "기도를 통해 공격의 기점을 만드는 강력한 방어 및 공격기입니다." },
    { q: "[044] [헌터X헌터] 곤의 필살기인 '짜잔권(자잔켄)' 중 전신 발산형 공격에 해당하는 계통은?", a: ["방출계", "파", "Paper"], hint: "손바닥을 펴서 장풍처럼 넨을 쏘아냅니다." },
    { q: "[045] [헌터X헌터] 키르아가 신속(간무루) 상태에서 사용하는 기술로, 적의 살기에 반응해 몸이 자동으로 움직이는 것은?", a: ["질풍신뢰", "싯푸진라이"], hint: "뇌의 명령을 거치지 않고 신경계로 직접 반응하는 초고속 회피/반격기입니다." },
    { q: "[046] [헌터X헌터] 헌터 시험관 중 한 명이자 암살 가문의 집사로, 코인(동전)을 총알처럼 던지는 인물은?", a: ["고토", "Gotoh"], hint: "키르아를 매우 아끼던 조르딕 가문의 집사장급 인물입니다." },
    { q: "[047] [헌터X헌터] 개미편의 키메라 앤트 중, 왕의 3전사 중 하나로 '테르프시코라'라는 꼭두각시 능력을 쓰는 자는?", a: ["피트", "네페르피트", "Pitou"], hint: "고양이의 모습을 한 특질계 능력자로, 카이토를 죽음에 이르게 했습니다." },
    { q: "[048] [헌터X헌터] 조르딕 가문의 저택 입구에 있는, 무게에 따라 열리는 거대한 문의 이름은?", a: ["시험의 문", "황천의 문", "Testing Gate"], hint: "암살 가문의 일원이 되기 위해 반드시 열어야 하는 문입니다." },
    { q: "[049] [헌터X헌터] 네테로 회장이 죽기 직전 사용한, 몸 안에 심어둔 소형 핵병기의 이름은?", a: ["미니어처 로즈", "가난한 자의 장미", "The Rose"], hint: "엄청난 살상력과 함께 강력한 독성(방사능)을 지닌 무기입니다." },
    { q: "[050] [헌터X헌터] 요크신 시티 경매에서 크라피카가 지켰던, 사람의 신체 일부를 수집하는 고용주의 딸은?", a: ["네온", "네온 노스트라드", "Neon"], hint: "백 퍼센트 적중하는 시 쓰기 예언 능력을 가지고 있었습니다." },
    { q: "[051] [헌터X헌터] 넨의 4대 행 중, 몸 밖으로 흐르는 기를 멈추어 가두는 기술은?", a: ["절", "제츠", "Zetsu"], hint: "기척을 숨기거나 피로를 회복할 때 사용합니다." },
    { q: "[052] [헌터X헌터] 암흑 대륙에서 온 오행(五害) 중 하나로, 안개상 생물인 '가스 생명체'의 이름은?", a: ["아이", "Ai"], hint: "나니카의 정체로 추정되는 생명체입니다." },
    { q: "[053] [헌터X헌터] 천공격투장에서 히소카가 사용한 기술로, 넨을 얇은 실처럼 만들어 고무와 껌의 성질을 갖게 하는 것은?", a: ["번지껌", "Bungee Gum"], hint: "히소카가 어린 시절 좋아했던 풍선껌 이름에서 따왔습니다." },
    { q: "[054] [헌터X헌터] 환영여단 멤버 중 실을 사용하여 상처를 꿰매거나 적을 구속하는 인물은?", a: ["마치", "마치 코마치네", "Machi"], hint: "히소카의 팔을 고쳐준 적이 있는 냉정한 성격의 여성입니다." },
    { q: "[055] [헌터X헌터] 넨 능력 중 자신의 오라를 문장이나 조건으로 바꾸어 타인에게 강요하는 기술을 무엇이라 하는가?", a: ["제약과 서약", "제약", "서약"], hint: "쿠라피카가 환영여단을 상대하기 위해 사용한 방식입니다." },
    { q: "[056] [헌터X헌터] 곤의 아버지 진 프릭스가 속했던, 헌터 협회의 간부 모임의 명칭은?", a: ["십이지", "준이신", "Zodiacs"], hint: "네테로 회장이 인정한 12명의 정예 헌터들입니다." },
    { q: "[057] [헌터X헌터] 히소카의 등 번호이자, 헌터 시험 당시 그가 달고 있던 번호표의 숫자는?", a: ["44", "44번"], hint: "죽음을 상징하는 숫자와 연관이 깊습니다." },
    { q: "[058] [하이큐] 카라스노 고교 배구부의 1학년 미들 블로커. 작은 키에도 불구하고 엄청난 점프력과 스피드를 지녔으며, '최강의 미끼' 역할을 하는 이 작품의 주인공은?", a: ["히나타 쇼요", "히나타 쇼우요우", "히나타", "쇼요", "쇼우요우", "일향", "최강의 미끼", "日向翔陽", "ひなたしょうよう", "日向", "翔陽", "ひなた", "しょうよう", "Hinata Shoyo", "Hinata Shouyou", "Hinata", "Shoyo"], hint: "주황색 머리가 특징이며, 카게야마와 함께 '괴짜 속공'을 사용합니다." },
    { q: "[059] [하이큐] 카라스노 고교 배구부의 1학년 미들 블로커. 큰 키와 냉정한 성격을 가졌으며, '블로킹은 시스템'이라는 지론을 가진 인물은?", a: ["츠키시마 케이", "츠키시마", "케이", "츳키", "츠키", "月島蛍", "つきしまけい", "月島", "蛍", "つきしま", "けい", "ツッキー", "Tsukishima Kei", "Tsukishima", "Kei", "Tsukki"], hint: "금발에 안경을 쓰고 있으며, 어그로를 잘 끄는 성격입니다." },
    { q: "[060] [하이큐] 카라스노 고교 배구부의 1학년 핀치 서버. 츠키시마와 소꿉친구이며, 점프 플로터 서브를 주특기로 삼는 인물은?", a: ["야마구치 타다시", "야마구치", "타다시", "山口忠", "やまぐちただし", "山口", "忠", "やまぐち", "ただし", "Yamaguchi Tadashi", "Yamaguchi", "Tadashi", "얌굿"], hint: "주근깨가 있으며, 츠키시마를 부를 때 항상 \"츳키!\"라고 부릅니다." },
    { q: "[061] [하이큐] 카라스노 고교 배구부의 3학년 주장. 포지션은 윙 스파이커(OP)로, 팀의 든든한 수비 기둥이자 정신적 지주인 인물은?", a: ["사와무라 다이치", "사와무라", "다이치", "다이치 주장", "주장", "澤村大地", "さわむらだいち", "澤村", "大地", "さわむら", "だいち", "Sawamura Daichi", "Sawamura", "Daichi"], hint: "화나면 가장 무서운 사람이며, 뛰어난 리시브 실력을 자랑합니다." },
    { q: "[062] [하이큐] 카라스노 고교 배구부의 3학년 부주장. 카게야마 입부 전까지 주전 세터였으며, 상냥하고 배려심 깊은 성격의 인물은?", a: ["스가와라 코시", "스가와라 코우시", "스가와라", "코시", "코우시", "스가", "스가 선배", "菅原孝支", "すがわらこうし", "菅原", "孝支", "すがわら", "こうし", "スガ", "Sugawara Koshi", "Sugawara Koushi", "Sugawara", "Koshi", "Suga"], hint: "눈물점과 은회색 머리가 특징이며, 핀치 서버로도 활약합니다." },
    { q: "[063] [하이큐] 카라스노 고교 배구부의 3학년 윙 스파이커. 겉보기엔 험악하지만 속은 아주 여린 '카라스노의 에이스'는?", a: ["아즈마네 아사히", "아즈마네", "아사히", "에이스", "東峰旭", "あずまねあさひ", "東峰", "旭", "あずまね", "あさひ", "Azumane Asahi", "Azumane", "Asahi"], hint: "수염을 기르고 장발을 묶은 헤어스타일(후에 바뀜)이 특징입니다." }, 
    { q: "[064] [하이큐] 네코마 고교 배구부의 2학년 세터. 쿠로오의 소꿉친구로, 체력은 약하지만 뛰어난 관찰력과 두뇌로 팀의 '뇌' 역할을 하는 인물은?", a: ["코즈메 켄마", "코즈메", "켄마", "孤爪研磨", "こづめけんま", "孤爪", "研磨", "こづめ", "けんま", "Kozume Kenma", "Kozume", "Kenma"], hint: "게임기를 항상 손에 쥐고 살며, 푸딩 같은 염색 머리가 특징입니다." }, 
    { q: "[065] [하이큐] 네코마 고교 배구부의 3학년 리베로. 니시노야가 존경할 정도로 뛰어난 리시브 실력을 갖춘 네코마 수비의 핵심은?", a: ["야쿠 모리스케", "야쿠", "모리스케", "夜久衛輔", "やくもりすけ", "夜久", "衛輔", "やく", "もりすけ", "Yaku Morisuke", "Yaku", "Morisuke", "얏쿵"], hint: "자신의 키(단신)에 대해 언급하는 것을 극도로 싫어합니다." }, 
    { q: "[066] [하이큐] 네코마 고교 배구부의 1학년 미들 블로커. 혼혈로 큰 키와 긴 팔다리를 가졌으며, 아직 초보지만 스스로 에이스라 칭하는 인물은?", a: ["하이바 리에프", "하이바 리에푸", "하이바", "리에프", "리에푸", "灰羽リエーフ", "はいばりえーふ", "灰羽", "リエーフ", "Haiba Lev", "Haiba", "Lev"], hint: "은발에 녹색 눈을 가졌으며, 스파이크 타점이 매우 높습니다." }, 
    { q: "[067] [하이큐] 아오바죠사이 고교 배구부의 3학년 윙 스파이커이자 부주장. 오이카와의 소꿉친구이자 가장 든든한 파트너인 '아오바죠사이의 에이스'는?", a: ["이와이즈미 하지메", "이와이즈미", "하지메", "이와쨩", "이와짱", "岩泉一", "いわいずみはじめ", "岩泉", "一", "いわいずみ", "はじめ", "岩ちゃん", "Iwaizumi Hajime", "Iwaizumi", "Hajime", "Iwa-chan"], hint: "오이카와가 헛소리를 할 때마다 폭력을 행사(?)하거나 호되게 혼냅니다." },
    { q: "[068] [하이큐] 다테 공업 고교 배구부의 미들 블로커. '철벽'이라 불리는 다테 공업의 핵심으로, 눈썹이 없는 험악한 인상의 거구는?", a: ["아오네 타카노부", "아오네", "타카노부", "青根高伸", "あおねたかのぶ", "青根", "高伸", "あおね", "たかのぶ", "Aone Takanobu", "Aone", "Takanobu"], hint: "말수가 거의 없으며, 히나타와 경기 전 화장실 앞에서 마주치는 기믹이 있습니다." },
    { q: "[069] [하이큐] 시라토리자와 학원의 3학년 미들 블로커. 직감에 의존하는 '게스 블로킹'의 달인으로 독특한 기행을 일삼는 인물은?", a: ["텐도 사토리", "텐도", "사토리", "게스 몬스터", "天童覚", "てんどうさとり", "天童", "覚", "てんどう", "さとり", "Tendo Satori", "Tendou Satori", "Tendo", "Tendou", "Satori", "Guess Monster"], hint: "빨간색 삐쭉 솟은 머리와 \"바키바키니 오레 (꺾어버려라)\"라는 노래가 특징입니다." },
    { q: "[070] [하이큐] 후쿠로다니 학원 배구부의 3학년 주장. 전국 톱 5 스파이커 중 한 명이지만, 기복이 심해서 기가 죽으면 아무것도 못하는 성격은?", a: ["보쿠토 코타로", "보쿠토 코우타로우", "보쿠토", "코타로", "코우타로우", "붱쿠토", "木兎光太郎", "ぼくとこうたろう", "木兎", "光太郎", "ぼくと", "こうたろう", "Bokuto Kotaro", "Bokuto Koutarou", "Bokuto", "Kotaro"], hint: "올빼미를 닮은 헤어스타일과 \"헤이헤이헤이!\"라는 기합이 상징입니다." },
    { q: "[071] [하이큐] 후쿠로다니 학원 배구부의 2학년 부주장 겸 세터. 기복이 심한 에이스 보쿠토를 능수능란하게 컨트롤하는 침착한 인물은?", a: ["아카아시 케이지", "아카아시", "케이지", "赤葦京治", "あかあしけいじ", "赤葦", "京治", "あかあし", "けいじ", "Akaashi Keiji", "Akaashi", "Keiji"], hint: "무기력해 보이지만 상황 판단이 매우 빠르고 보쿠토 조련의 달인입니다." },
    { q: "[072] [하이큐] 이나리자키 고교의 2학년 세터. 전국 고교 최고 수준의 세터이자 '고교 NO.1 서버'로 불리는 인물로 쌍둥이 형제를 둔 캐릭터는?", a: ["미야 아츠무", "아츠무", "미야", "츠무", "宮侑", "みやあつむ", "宮", "侑", "みや", "あつむ", "Miya Atsumu", "Miya", "Atsumu", "Tsumu"], hint: "금발 머리이며, 서브 전 관중들의 응원을 손짓 하나로 멈추게 하는 루틴이 있습니다." },
    { q: "[073] [하이큐] 이나리자키 고교의 2학년 윙 스파이커. 미야 아츠무의 쌍둥이 형제(동생)로, 뛰어난 기량으로 세터 역할까지 대신할 수 있는 인물은?", a: ["미야 오사무", "오사무", "미야", "사무", "宮治", "みやおさむ", "治", "おさむ", "Miya Osamu", "Osamu", "Samu"], hint: "은발 머리이며, 배구를 은퇴한 후 주먹밥 가게(오니기리 미야)를 차립니다." },
    { q: "[074] [하이큐] 이나리자키 고교 배구부의 주장. 실력 자체는 평범하지만, 로봇 같을 정도로 정론과 멘탈 관리에 완벽해 팀원들을 단결시키는 인물은?", a: ["키타 신스케", "키타", "신스케", "北信介", "きたしんすけ", "北", "信介", "きた", "しんすけ", "Kita Shinsuke", "Kita", "Shinsuke"], hint: "\"결과는 따라오는 것뿐\"이라는 철학을 가지며, 할머니의 가르침을 깊이 새기고 있습니다." },
    { q: "[075] [하이큐] 카모메다이 고교의 2학년 윙 스파이커. 단신이지만 압도적인 점프력과 체공력을 가진 '작은 거인'의 완성형이라 불리는 선수는?", a: ["호시우미 코라이", "호시우미 코우라이", "호시우미", "코라이", "코우라이", "星海光来", "ほしうみこうらい", "星海", "光来", "ほしうみ", "こうらい", "Hoshiumi Korai", "Hoshiumi Kourai", "Hoshiumi", "Korai"], hint: "갈매기를 연상시키는 흰색+은회색 머리이며, 블록 아웃과 서브 등 모든 기술이 뛰어납니다." },
    { q: "[076] [하이큐] 카라스노 고교 배구부의 고문 선생님. 배구에 대한 지식은 전무했지만, 특유의 열정과 시적인 명언으로 팀을 이끄는 인물은?", a: ["타케다 잇테츠", "타케다", "잇테츠", "타케다 선생님", "타케쨩", "타케짱", "武田一鉄", "たけだいってつ", "武田", "一鉄", "たけだ", "いってつ", "Takeda Ittetsu", "Takeda", "Ittetsu"], hint: "동네 상점가와 다른 학교를 끊임없이 찾아다니며 연습 시합을 성사시킵니다." },
    { q: "[077] [하이큐] 카라스노 고교 배구부의 감독. '사카노시타 상점'의 점장이자, 과거 명장 카라스노 감독의 손자로 팀을 지휘하는 인물은?", a: ["우카이 케이신", "우카이", "케이신", "우카이 코치", "우카이 감독", "烏養繋心", "うかいけいしん", "烏養", "繋心", "うかい", "けいしん", "Ukai Keishin", "Ukai", "Keishin"], hint: "금발에 머리띠를 하고 있으며, 경기 중 담배를 자주 물고 있습니다(애니 초반)." },
    { q: "[078] [은혼] 긴토키가 운영하는 해결사의 직원(츳코미 담당). 본체는 안경이라고 놀림받으며, 과거 검술 도장의 후계자인 인물은?", a: ["시무라 신파치", "신파치", "파치", "안경", "안경걸이", "신파치 군", "신쨩", "志村新八", "しむらしんぱち", "新八", "しんぱち", "Shimura Shinpachi", "Shinpachi", "Megane", "Pachi"], hint: "아이돌 테라카도 츠우의 친위대 대장을 맡고 있습니다." }, 
    { q: "[079] [은혼] 진선조(신센구미)의 국장. 대원들에게 존경받는 훌륭한 대장이지만, 신파치의 누나인 오타에에게 스토커 짓을 하는 고릴라 속성의 캐릭터는?", a: ["콘도 이사오", "콘도", "이사오", "고릴라", "고릴라 스토커", "국장님", "近藤勲", "こんどういさお", "近藤", "勲", "こんどう", "いさお", "Kondo Isao", "Kondou Isao", "Kondo", "Isao", "Gorilla"], hint: "전라로 등장하는 빈도가 높으며, '고릴라'라는 별명으로 불립니다." }, 
    { q: "[080] [은혼] 긴토키의 소꿉친구이자 양이전쟁 동지. 온건파 양이지사의 리더로, 긴토키가 '즈라'라고 부를 때마다 \"즈라가 아니다, OOO다!\"라고 외치는 인물은?", a: ["카츠라 코타로", "카츠라 코타로우", "카츠라", "코타로", "즈라", "도주 카츠라", "광란의 귀공자", "桂小太郎", "かつらこたろう", "桂", "小太郎", "かつら", "こたろう", "ヅラ", "Katsura Kotaro", "Katsura Koutarou", "Katsura", "Kotaro", "Zura"], hint: "긴 흑발을 가졌으며, 엘리자베스와 항상 함께 다닙니다." }, 
    { q: "[081] [은혼] 긴토키의 소꿉친구이자 과격파 양이지사인 '귀병대'의 총독. 세상을 부수겠다는 목표를 가진 은혼 최고의 악역이자 라이벌은?", a: ["타카스기 신스케", "타카스기", "신스케", "숙혜", "高杉晋助", "たかすぎしんすけ", "高杉", "晋助", "たかすぎ", "しんすけ", "Takasugi Shinsuke", "Takasugi", "Shinsuke"], hint: "왼쪽 눈에 붕대를 감고 화려한 기모노를 입고 곰방대를 피웁니다." },
    { q: "[082] [은혼] 긴토키의 양이전쟁 동지로, 현재는 무역 함대 '쾌원대'의 함장. 긍정적이고 호탕하게 \"아하하하\" 웃으며 총을 무기로 쓰는 인물은?", a: ["사카모토 타츠마", "사카모토", "타츠마", "목소리 큰 사람", "坂本辰馬", "さかもとたつま", "坂本", "辰馬", "さかもと", "たつま", "Sakamoto Tatsuma", "Sakamoto", "Tatsuma"], hint: "우주선을 조종하지만 배멀미(우주선 멀미)가 엄청나게 심합니다." }, 
    { q: "[083] [은혼] 신파치의 누나로, 캬바쿠라 스마일에서 일하고 있는 여성. 겉보기엔 미인이지만 엄청난 괴력과 흉폭성을 자랑하는 인물은?", a: ["시무라 타에", "오타에", "타에", "누님", "보스", "志村妙", "しむらたえ", "お妙", "おたえ", "妙", "たえ", "Shimura Tae", "Otae", "Tae"], hint: "요리조차 모든 것을 새까만 '다크매터(암흑물질)'로 만들어버리는 특기가 있습니다." }, 
    { q: "[084] [은혼] 요시와라 도원향을 자경하는 조직 백화의 수령. '죽음의 성전(사신 다유)'이라 불리며 쿠나이(단검)를 무기로 쓰는 여성 캐릭터는?", a: ["츠쿠요", "츠키", "츳키", "달詠", "月詠", "つくよ", "Tsukuyo", "Tsukky"], hint: "얼굴에 흉터가 있으며 긴토키에게 호감을 품고 있고, 술에 매우 약해 술주정이 심합니다." },
    { q: "[085] [은혼] 엘리트 관료였으나 긴토키와 엮이면서 직장을 잃고 골판지 집을 전전하는 백수. '마치 다메나 오산(완전 글러먹은 아저씨)'의 줄임말로 불리는 인물은?", a: ["하세가와 타이조", "하세가와 타이조우", "하세가와", "타이조", "마다오", "완폐아", "長谷川泰三", "はせがわたいぞう", "長谷川", "泰三", "マダオ", "Hasegawa Taizo", "Hasegawa", "Taizo", "Madao"], hint: "선글라스가 본체 취급을 받으며, 항상 불행한 일이 따라다닙니다." },
    { q: "[086] [은혼] 진선조(신센구미)의 감찰. 존재감이 매우 흐리고 배드민턴과 단팥빵(앙팡)에 미쳐있는 인물은?", a: ["야마자키 사가루", "야마자키", "사가루", "자키", "단팥빵", "안팡", "지미", "山崎退", "やまざきさがる", "山崎", "退", "やまざき", "さがる", "ザキ", "Yamazaki Sagaru", "Yamazaki", "Sagaru", "Zaki"], hint: "임무 중 잠복을 할 때 항상 배드민턴을 치거나 단팥빵만 먹습니다." },
    { q: "[087] [은혼] 가부키쵸 사천왕 중 한 명이자 긴토키가 세들어 사는 건물의 집주인 할머니. 긴토키에게 항상 월세를 내라며 소리치는 인물은?", a: ["오토세", "테라다 아야노", "아야노", "お登勢", "おとせ", "寺田綾乃", "てらだあやの", "Otose", "Terada Ayano", "Ayano"], hint: "젊은 시절에는 가부키쵸 최고의 미인이었으며, 마음씨가 따뜻합니다." }, 
    { q: "[088] [은혼] 오토세의 스낵바에서 일하는 고양이귀 천인(외계인). 원래는 도둑이었으나 개과천선(?)한 늙은 고양이상 캐릭터는?", a: ["캐서린", "케서린", "캬서린", "キャサリン", "Catherine"], hint: "금발 머리에 고양이 귀가 달렸지만 아줌마 얼굴을 하고 있으며 간사이 사투리를 씁니다." }, 
    { q: "[089] [은혼] 어정번중 출신의 닌자로 치질(...)을 앓고 있으며 툭하면 엉덩이에 쿠나이가 꽂히는 캐릭터는?", a: ["핫토리 젠조", "핫토리 젠조우", "핫토리", "젠조", "치질 닌자", "服部全蔵", "はっとりぜんぞう", "服部", "全蔵", "はっとり", "ぜんぞう", "Hattori Zenzo", "Hattori Zenzou", "Hattori", "Zenzo"], hint: "점프(만화잡지)를 엄청나게 좋아하며 앞머리로 눈을 항상 가리고 있습니다." },
    { q: "[090] [은혼] 어정번중 출신의 쿠노이치(여닌자). 엄청난 근시라 안경이 없으면 아무것도 못 보며, 긴토키를 짝사랑하는 암퇘지(M) 성향의 캐릭터는?", a: ["사루토비 아야메", "사루토비", "아야메", "삿짱", "삿쨩", "메스부타", "猿飛あやめ", "さるとびあやめ", "猿飛", "さるとび", "さっちゃん", "Sarutobi Ayame", "Sarutobi", "Ayame", "Sacchan"], hint: "항상 긴토키에게 스토킹을 시도하다 맞지만 오히려 그것을 즐깁니다. 특기 무기는 낫토입니다." },
    { q: "[091] [은혼] 에도 막부의 경찰청장. '파괴신'이라 불리며 항상 총을 쏴대고 술집에서 놀기 좋아하는 진선조의 최고 상관은?", a: ["마츠다이라 카타쿠리코", "마츠다이라", "카타쿠리코", "마츠다이라 아저씨", "파괴신", "마츠다이라 아재", "松平片栗虎", "まつだいらかたくりこ", "松平", "まつだいら", "とっつぁん", "Matsudaira Katakuriko", "Matsudaira", "Katakuriko"], hint: "\"남자는 1만 알면 된다\" 등의 명언(망언)을 제조하며 딸인 쿠리코를 극도로 아낍니다." },
    { q: "[092] [은혼] 야토족 제일의 청부업자이자 카구라와 카무이의 아버지. 대머리(정확히는 바코드 머리)가 콤플렉스인 우주 최강의 사냥꾼은?", a: ["우미보즈", "칸코우", "우미보우즈", "대머리", "星海坊主", "うみぼうず", "神晃", "かんこう", "Umibozu", "Umibouzu", "Kankou"], hint: "지구에 올 때마다 긴토키에게 카구라를 맡긴 일로 엮이거나 대머리로 놀림받습니다." }, 
    { q: "[093] [은혼] 카구라의 친오빠로 야토족의 피를 짙게 이어받은 전투광. 항상 웃는 얼굴로 살육을 즐기며 우주 해적 하루사메의 7사단장인 캐릭터는?", a: ["카무이", "신위", "바보 오빠", "神威", "かむい", "Kamui"], hint: "만두나 밥을 엄청나게 먹어치우며, 땋은 머리와 붕대(또는 우산)가 특징입니다." }, 
    { q: "[094] [은혼] 야규 가문의 차기 당주. 여성이지만 남자로 키워졌으며, 오타에를 향해 맹목적인 사랑을 바치며 남성 혐오증이 있는 캐릭터는?", a: ["야규 큐베", "야규 큐베이", "야규", "큐베", "큐짱", "큐쨩", "구병위", "柳生九兵衛", "やぎゅうきゅうべえ", "柳生", "九兵衛", "きゅうちゃん", "Yagyu Kyubei", "Yagyu", "Kyubei"], hint: "왼쪽 눈에 안대를 하고 있으며, 원숭이 '수한무'의 주인입니다." }, 
    { q: "[095] [은혼] 긴토키 일행이 주워다 키우고 있는 거대한 우주 생물(이누가미). 평범한 개처럼 보이지만 집채만 한 크기로 남의 머리를 깨무는 습관이 있는 캐릭터는?", a: ["사다하루", "정춘", "정춘이", "定春", "さだ하루", "さだはる", "Sadaharu"], hint: "딸기 우유를 먹으면 크기가 더욱 거대해지고 폭주합니다." }, 
    { q: "[096] [은혼] 해결사 사무소 근처에 쓰러져 있던 기계 가정부(로봇). 오토세 스낵바에서 일하며 감정을 배워나가는 안드로이드 캐릭터는?", a: ["타마", "후요", "芙蓉", "たま", "Tama"], hint: "몸 속에 기름이나 볼트를 넣어서 이상한 음식(오바이트)을 만들어냅니다." }, 
    { q: "[097] [은혼] 에도 막부의 정이대장군(쇼군). 고귀한 신분이지만 해결사와 엮일 때마다 강제로 팬티 한 장만 남고 굴욕을 당하는 불쌍한(?) 인물은?", a: ["도쿠가와 시게시게", "도쿠가와", "시게시게", "쇼군", "장군", "장군님", "쇼군 카요", "쇼군카요", "徳川茂茂", "とくがわしげしげ", "徳川", "茂茂", "将軍", "Tokugawa Shigeshige", "Tokugawa", "Shigeshige", "Shogun"], hint: "수영장, 이발소, 스키장 등 어디를 가든 불행한 사고로 상투가 잘리거나 알몸이 됩니다." },
];

//  런타임 상태
var userMap = {};   // { hash → { name, updatedAt } }
var userData = {};   // { hash → { chat, lastChatAt, point, attend, attendRanks[], quizCorrect } }
var attendance = { dateKey: "", list: [] };  // { dateKey, list: [{hash, time}] }
var fortune = { dateKey: "", data: {} };  // { dateKey, data: {hash → fortune} }

// 팀코 및 트윈
var recruit = { list: [] };

// 퀴즈 런타임
var quizActive = false;
var currentQuiz = null;   // { q, a[], hint, _qid }
var quizAnswered = {};      // { hash → true }

// 퀴즈 당일 순서 캐시
var todayQuizDateKey = "";
var todayQuizOrder = [];  // QUIZ_BANK 인덱스 배열 (당일 시드 셔플)
var usedQuizIds = {};  // { idx → true }

// 퀴즈 일일 진행 횟수 (하루 최대 10문제)
var quizDailyDateKey = "";
var quizDailyCount = 0;

// 
//  유틸: 날짜/시간
// 
function pad2(n) { return (n < 10 ? "0" : "") + n; }

function getTodayKey() {
    var d = new Date();
    return d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate();
}

function nowKSTString() {
    var d = new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate())
        + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds());
}

// 
//  유틸: DB 읽기/쓰기
// 
function dbRead(file, fallback) {
    try {
        var raw = Database.readString(file);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
}

function dbWrite(file, obj) {
    try { Database.writeString(file, JSON.stringify(obj)); } catch (e) { /* ignore */ }
}

//  데이터 로드 / 저장
function loadAll() {
    userMap = dbRead(FILE_USER_MAP, {});
    userData = dbRead(FILE_USER_DATA, {});
    attendance = dbRead(FILE_ATTENDANCE, { dateKey: "", list: [] });
    fortune = dbRead(FILE_FORTUNE, { dateKey: "", data: {} });
    recruit = dbRead(FILE_RECRUIT, { list: [] });  // ← { list: [] } 로 변경
}

function saveUserMap() { dbWrite(FILE_USER_MAP, userMap); }
function saveUserData() { dbWrite(FILE_USER_DATA, userData); }
function saveAttendance() { dbWrite(FILE_ATTENDANCE, attendance); }
function saveFortune() { dbWrite(FILE_FORTUNE, fortune); }

// 
//  날짜 리셋 (매 메시지 호출)
// 
function resetDailyIfNeeded() {
    var today = getTodayKey();
    if (attendance.dateKey !== today) {
        attendance = { dateKey: today, list: [] };
        saveAttendance();
    }
    if (fortune.dateKey !== today) {
        fortune = { dateKey: today, data: {} };
        saveFortune();
    }
}

// 
//  유저 맵
// 
function nameOf(hash) {
    return (userMap[hash] && userMap[hash].name) ? userMap[hash].name : hash;
}

// 메시지마다 호출 — 닉네임이 바뀐 경우에만 저장
function syncUserMap(hash, name) {
    if (!userMap[hash] || userMap[hash].name !== name) {
        userMap[hash] = { name: name, updatedAt: nowKSTString() };
        saveUserMap();
    }
}

// 닉네임 검색어 포함 → 매칭 hash 목록
function findHashesByName(query) {
    var result = [], h;
    query = (query + "").replace(/^\s+|\s+$/g, "").toLowerCase();
    for (h in userMap) {
        if (!userMap.hasOwnProperty(h)) continue;
        if (userMap[h].name && userMap[h].name.toLowerCase().indexOf(query) !== -1) {
            result.push(h);
        }
    }
    return result;
}

// 
//  유저 데이터 헬퍼
// 
function ensureUser(hash) {
    if (!userData[hash]) userData[hash] = {};
    var u = userData[hash];
    if (typeof u.chat !== "number") u.chat = 0;
    if (!u.lastChatAt) u.lastChatAt = null;
    if (typeof u.point !== "number") u.point = 0;
    if (typeof u.attend !== "number") u.attend = 0;
    if (!Array.isArray(u.attendRanks)) u.attendRanks = [];
    if (typeof u.quizCorrect !== "number") u.quizCorrect = 0;
    // 뽑기
    if (typeof u.drawCount !== "number") u.drawCount = 0;
    if (!u.drawDate) u.drawDate = "";
}

// 
//  포인트: 더블업 타임 판단
// 
function isDoubleUpTime() {
    var d = new Date();
    var day = d.getDay();
    var mins = d.getHours() * 60 + d.getMinutes();
    // 주말: 00:00~05:59 또는 13:00~16:00
    // 평일: 00:00~06:59 또는 12:00~16:00
    if (day === 0 || day === 6) return (mins <= 359) || (mins >= 780 && mins <= 960);
    return (mins <= 419) || (mins >= 720 && mins <= 960);
}

function addChatPoint(hash) {
    ensureUser(hash);
    userData[hash].point += isDoubleUpTime() ? 2 : 1;
}

// 
//  채팅 카운트
// 
function recordChat(hash) {
    ensureUser(hash);
    userData[hash].chat += 1;
    userData[hash].lastChatAt = nowKSTString();
}

// 
//  출석
// 
function isAttendanceTime() {
    var d = new Date();
    var day = d.getDay();
    var mins = d.getHours() * 60 + d.getMinutes();
    // 주말 06:00~13:00 / 평일 07:00~12:00
    var start = (day === 0 || day === 6) ? 360 : 420;
    var end = (day === 0 || day === 6) ? 780 : 720;
    return mins >= start && mins <= end;
}

function hasAttendedToday(hash) {
    var i;
    for (i = 0; i < attendance.list.length; i++) {
        if (attendance.list[i].hash === hash) return true;
    }
    return false;
}

// 출석 등록 → { rank, earnedPoint } 반환
function doAttend(hash) {
    attendance.list.push({ hash: hash, time: nowKSTString() });
    var rank = attendance.list.length;

    ensureUser(hash);
    userData[hash].attend += 1;
    userData[hash].attendRanks.push(rank);

    // 1~5등: 20~16점, 이후 10점
    var base = (rank >= 1 && rank <= 5) ? (21 - rank) : 10;
    userData[hash].point += base;

    return { rank: rank, earnedPoint: base };
}

function medalOf(rank) {
    return rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
}

// 
//  뽑기 (자동 출석 시 5회 진행)
// 
function gachaRoll() {
    var roll = Math.random() * 100; // 0 ~ 100
    if (roll < 0.1) return { grade: "ANOTHER GRADE", point: 200 };
    if (roll < 1.1) return { grade: "1등", point: 100 };
    if (roll < 6.1) return { grade: "2등", point: 20 };
    if (roll < 16.1) return { grade: "3등", point: 10 };
    if (roll < 36.1) return { grade: "4등", point: 5 };
    return { grade: "꽝", point: 0 };
}

function doGachaBatch(hash) {
    ensureUser(hash);
    var u = userData[hash];
    var results = [], i, r, totalPoint = 0;
    for (i = 1; i <= 5; i++) {
        r = gachaRoll();
        totalPoint += r.point;
        results.push({ round: i, grade: r.grade, point: r.point });
    }
    u.point += totalPoint;
    u.drawCount = (u.drawCount || 0) + 5;
    u.drawDate = getTodayKey();
    return { results: results, totalPoint: totalPoint };
}

function formatGachaResults(results) {
    var out = "", i;
    for (i = 0; i < results.length; i++) {
        out += "뽑기 " + results[i].round + "회차: " + results[i].grade + " (" + results[i].point + "점)" + (i < results.length - 1 ? "\n" : "");
    }
    return out;
}

// 
//  출석 평균 등수 계산
// 
function calcAvgRank(hash) {
    ensureUser(hash);
    var rks = userData[hash].attendRanks;
    if (!rks || !rks.length) return null;  // null = 기록 없음
    var sum = 0, i;
    for (i = 0; i < rks.length; i++) sum += rks[i];
    return sum / rks.length;
}

function avgRankStr(hash) {
    var avg = calcAvgRank(hash);
    return avg === null ? "N/A" : avg.toFixed(2);
}

// 
//  퀴즈
// 
function seededRng(seed) {
    var s = seed % 0x80000000;
    return function () {
        s = (1103515245 * s + 12345) % 0x80000000;
        return s / 0x80000000;
    };
}

function shuffledIndices(len, seed) {
    var arr = [], i, j, tmp, rng = seededRng(seed);
    for (i = 0; i < len; i++) arr.push(i);
    for (i = len - 1; i > 0; i--) {
        j = Math.floor(rng() * (i + 1));
        tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
}

function ensureTodayQuizOrder() {
    var today = getTodayKey(), parts, seed;
    if (todayQuizDateKey === today && todayQuizOrder.length) return;
    parts = today.split(".");
    seed = parseInt(parts[0], 10) * 10000 + parseInt(parts[1], 10) * 100 + parseInt(parts[2], 10);
    todayQuizOrder = shuffledIndices(QUIZ_BANK.length, seed);
    todayQuizDateKey = today;
    usedQuizIds = {};
}

// 하루 퀴즈 진행 횟수 리셋 체크
function ensureQuizDailyCount() {
    var today = getTodayKey();
    if (quizDailyDateKey !== today) {
        quizDailyDateKey = today;
        quizDailyCount = 0;
    }
}

function isQuizTime() {
    var mins = new Date().getHours() * 60 + new Date().getMinutes();
    return mins <= 23 * 60 + 30;  // 00:00 ~ 23:30
}

function startQuizRound(msg) {
    var remaining, i, idx, pick, normAnswers, j;

    // 조건 1: 시간 제한
    if (!isQuizTime()) {
        msg.reply("⏰ 지금은 퀴즈 가능 시간이 아닙니다.\n[퀴즈 가능 시간] 매일 00:00 ~ 23:30");
        return;
    }

    // 조건 2: 하루 10회 제한
    ensureQuizDailyCount();
    if (quizDailyCount >= 15) {
        msg.reply("📦 오늘의 퀴즈 15문제를 모두 사용했습니다.\n내일 다시 도전해 주세요!");
        return;
    }

    if (quizActive) {
        msg.reply("이미 퀴즈가 진행 중입니다.\n'정답 (내용)' 으로 정답을 제출하세요!");
        return;
    }

    // 조건 3: 잔여 문제 풀 10개 미만이면 차단
    ensureTodayQuizOrder();
    remaining = [];
    for (i = 0; i < todayQuizOrder.length; i++) {
        idx = todayQuizOrder[i];
        if (!usedQuizIds[idx]) remaining.push(idx);
    }
    if (remaining.length < 10) {
        msg.reply("📦 오늘 남은 문제 풀이 10개 미만이라 퀴즈를 종료합니다.\n내일 다시 도전해 주세요!");
        return;
    }

    idx = remaining[Math.floor(Math.random() * remaining.length)];
    pick = QUIZ_BANK[idx];

    normAnswers = [];
    for (j = 0; j < pick.a.length; j++) normAnswers.push(pick.a[j].replace(/^\s+|\s+$/g, ""));

    currentQuiz = { q: pick.q, a: normAnswers, hint: pick.hint || "힌트가 없습니다.", _qid: idx };
    quizActive = true;
    quizAnswered = {};
    usedQuizIds[idx] = true;
    quizDailyCount += 1;

    msg.reply("🧩 퀴즈 시작! (오늘 " + quizDailyCount + "/15)\nQ. " + currentQuiz.q + "\n\n[ 정답 (내용) | !힌트 | !종료 ]");
}

function stopQuiz(msg, text) {
    quizActive = false;
    currentQuiz = null;
    quizAnswered = {};
    if (msg) msg.reply(text || "퀴즈가 종료되었습니다.");
}

function submitAnswer(hash, displayName, payload, msg) {
    function norm(s) { return (s + "").replace(/\s+/g, "").toLowerCase(); }
    var ans, i;

    if (!quizActive || !currentQuiz) {
        msg.reply("지금은 진행 중인 퀴즈가 없습니다. '!퀴즈'로 시작해보세요!"); return;
    }
    ans = (payload || "").replace(/^\s+|\s+$/g, "");
    if (!ans) { msg.reply("정답 형식: '정답 (내용)'"); return; }
    if (quizAnswered[hash]) { msg.reply(displayName + " 님은 이미 이번 문제를 맞히셨습니다!"); return; }

    for (i = 0; i < currentQuiz.a.length; i++) {
        if (norm(ans) === norm(currentQuiz.a[i])) {
            quizAnswered[hash] = true;
            ensureUser(hash);
            userData[hash].quizCorrect += 1;
            userData[hash].point += 5;
            saveUserData();
            stopQuiz(msg, "🎉 정답! " + displayName + " 님\n(+5점 적립, 누적 정답 " + userData[hash].quizCorrect + "회)");
            return;
        }
    }
    msg.reply("❌ 오답! 다시 시도해보세요.");
}

// 
//  랭킹 빌더
// 

// !퀴즈랭킹 — quizCorrect >= 1 인 유저만 포함
function buildQuizRanking() {
    var rows = [], h;
    for (h in userData) {
        if (!userData.hasOwnProperty(h)) continue;
        var correct = userData[h].quizCorrect || 0;
        if (correct < 1) continue;  // 한 번도 못 맞힌 유저 제외
        rows.push({ hash: h, name: nameOf(h), correct: correct });
    }
    rows.sort(function (a, b) {
        return b.correct !== a.correct ? b.correct - a.correct
            : (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    });
    return rows;
}

// !출석통계 — attend >= 1 인 유저만 포함
// 정렬: 출석일수 내림차순 → (동일 시) 평균등수 오름차순
function buildAttendRanking() {
    var rows = [], h;
    for (h in userData) {
        if (!userData.hasOwnProperty(h)) continue;
        var attend = userData[h].attend || 0;
        if (attend < 1) continue;
        var avg = calcAvgRank(h);
        rows.push({ hash: h, name: nameOf(h), attend: attend, avg: avg });
    }
    rows.sort(function (a, b) {
        if (b.attend !== a.attend) return b.attend - a.attend;
        // 평균등수 오름차순 (낮을수록 좋음), null은 맨 뒤
        var aAvg = (a.avg === null) ? Infinity : a.avg;
        var bAvg = (b.avg === null) ? Infinity : b.avg;
        return aAvg - bAvg;
    });
    return rows;
}

// !멤버통계 — 기록 있는 유저 전체, 점수 내림차순
function buildMemberStats() {
    var rows = [], h;
    for (h in userData) {
        if (!userData.hasOwnProperty(h)) continue;
        ensureUser(h);
        var u = userData[h];
        rows.push({
            hash: h,
            name: nameOf(h),
            point: u.point,
            chat: u.chat,
            lastChatAt: u.lastChatAt || "기록 없음",
            attend: u.attend,
            avg: calcAvgRank(h),
            quizCorrect: u.quizCorrect
        });
    }
    rows.sort(function (a, b) {
        return b.point !== a.point ? b.point - a.point : b.chat - a.chat;
    });
    return rows;
}

// 퀴즈 랭킹 순위 조회 (단일 유저용)
function quizRankOf(hash) {
    var rows = buildQuizRanking(), i;
    for (i = 0; i < rows.length; i++) {
        if (rows[i].hash === hash) return i + 1;
    }
    return null;
}

// 
//  단일 유저 정보 문자열
// 
function userInfoText(hash) {
    ensureUser(hash);
    var u = userData[hash];
    var qr = quizRankOf(hash);
    return "점수 " + u.point + "점 | 채팅수 " + u.chat + "개\n"
        + "출석 " + u.attend + "일 | 출석 평균등수 " + avgRankStr(hash) + "위\n"
        + "퀴즈 정답 " + u.quizCorrect + "회 | 퀴즈 랭킹 " + (qr ? qr + "위" : "기록 없음") + "\n"
        + "마지막 채팅 " + (u.lastChatAt || "기록 없음");
}

// 
//  관리자: 유저 데이터 삭제
// 
function deleteUserByName(query, msg) {
    var hashes = findHashesByName(query);
    if (!hashes.length) { msg.reply("⚠️ [" + query + "] 에 해당하는 유저가 없습니다."); return; }
    if (hashes.length > 1) {
        var names = [], hi;
        for (hi = 0; hi < hashes.length; hi++) names.push(nameOf(hashes[hi]));
        msg.reply("⚠️ 여러 명 매칭됨: " + names.join(", ") + "\n더 정확한 닉네임으로 다시 입력해주세요.");
        return;
    }
    var hash = hashes[0], found = false, newList, i;
    if (userData[hash]) { delete userData[hash]; found = true; }
    newList = [];
    for (i = 0; i < attendance.list.length; i++) {
        if (attendance.list[i].hash !== hash) newList.push(attendance.list[i]);
    }
    if (newList.length !== attendance.list.length) { attendance.list = newList; found = true; }
    if (fortune.data[hash]) { delete fortune.data[hash]; found = true; }
    if (found) {
        saveUserData(); saveAttendance(); saveFortune();
        msg.reply("✅ [" + nameOf(hash) + "] 의 데이터를 삭제했습니다.");
    } else {
        msg.reply("⚠️ [" + nameOf(hash) + "] 의 데이터가 없습니다.");
    }
}

// 
//  관리자: 대리 출석 (뽑기 미적용 — 관리자 임의처리이므로 자동뽑기 대상 아님)
// 
function proxyAttendByName(query, msg) {
    var hashes = findHashesByName(query);
    if (!hashes.length) { msg.reply("⚠️ [" + query + "] 에 해당하는 유저가 없습니다."); return; }
    if (hashes.length > 1) {
        var names = [], hi;
        for (hi = 0; hi < hashes.length; hi++) names.push(nameOf(hashes[hi]));
        msg.reply("⚠️ 여러 명 매칭됨: " + names.join(", ") + "\n더 정확한 닉네임으로 다시 입력해주세요.");
        return;
    }
    var hash = hashes[0];
    if (hasAttendedToday(hash)) { msg.reply("[" + nameOf(hash) + "] 님은 오늘 이미 출석하셨습니다."); return; }
    var res = doAttend(hash);
    saveUserData(); saveAttendance();
    msg.reply(
        "✅ 관리자 대리 출석 완료\n"
        + "[" + nameOf(hash) + "] 님, " + res.rank + "등 출석 " + medalOf(res.rank) + "\n"
        + "적립 포인트: " + res.earnedPoint + "점"
    );
}

// 
//  모집 게시판 (팀코 / 트윈)
// 

function saveRecruit() { dbWrite(FILE_RECRUIT, recruit); }

function nextRecruitCode() {
    var list = recruit.list;
    var max = 0, i, n;
    for (i = 0; i < list.length; i++) {
        n = parseInt(list[i].code, 10);
        if (n > max) max = n;
    }
    var next = max + 1;
    var s = "" + next;
    while (s.length < 4) s = "0" + s;
    return s;
}

function addRecruit(type, content, msg) {
    // type: "TWIN" | "TEAMCOS"
    var code = nextRecruitCode();
    recruit.list.push({ code: code, type: type, content: content });
    saveRecruit();
    var label = (type === "TWIN") ? "트윈" : "팀코";
    msg.reply("✅ " + label + " 모집이 등록되었어요!\n코드: " + code + "\n유형: " + type + "\n내용: " + content);
}

function listRecruit(type, msg) {
    // type: "TWIN" | "TEAMCOS" | null (전체)
    var all = recruit.list;
    var filtered = [], i;
    for (i = 0; i < all.length; i++) {
        if (!type || all[i].type === type) filtered.push(all[i]);
    }
    var label = type === "TWIN" ? "트윈" : type === "TEAMCOS" ? "팀코" : "📋 전체";
    if (!filtered.length) {
        msg.reply(label + " 모집 중인 항목이 없어요. 😢\n등록은 관리자(이한)에게 문의해주세요!");
        return;
    }
    var out = label + " 모집중‼️\n———————————————\n", item;
    for (i = 0; i < filtered.length; i++) {
        item = filtered[i];
        out += "[" + item.code + "]" + "\n" + item.content;
        if (i < filtered.length - 1) out += "\n———————————————\n";
    }
    msg.reply(out);
}

function deleteRecruitByCode(code, msg) {
    var norm = (code + "").replace(/^\s+|\s+$/g, "");
    while (norm.length < 4) norm = "0" + norm;
    var list = recruit.list;
    var newList = [], i, found = false, foundItem;
    for (i = 0; i < list.length; i++) {
        if (list[i].code === norm) { found = true; foundItem = list[i]; }
        else { newList.push(list[i]); }
    }
    if (!found) { msg.reply("⚠️ [" + norm + "] 코드에 해당하는 항목이 없습니다."); return; }
    recruit.list = newList;
    saveRecruit();
    msg.reply("✅ [" + norm + "] [" + foundItem.type + "] 항목을 삭제했습니다.\n내용: " + foundItem.content);
}

function clearRecruit(type, msg) {
    // type: "TWIN" | "TEAMCOS" | null (전체)
    var list = recruit.list;
    var newList = [], i;
    for (i = 0; i < list.length; i++) {
        if (type && list[i].type !== type) newList.push(list[i]);
    }
    recruit.list = newList;
    saveRecruit();
    var label = type === "TWIN" ? "트윈" : type === "TEAMCOS" ? "팀코" : "전체";
    msg.reply("✅ " + label + " 모집 목록을 초기화했습니다.");
}

// 
//  메인 리스너
// 
bot.addListener(Event.MESSAGE, function (msg) {
    var room = msg.room;
    var senderName = msg.author.name;
    var senderHash = msg.author.hash || senderName;  // Android 11 미만 fallback
    var content = msg.content;
    var isTarget = (room === TARGET_ROOM);
    var isAdminDM = (!msg.isGroupChat && ADMIN_NAMES.indexOf(senderName) !== -1);

    if (!isTarget && !isAdminDM) return;

    loadAll();
    resetDailyIfNeeded();

    if (!isAdminDM) syncUserMap(senderHash, senderName);

    // 
    //  관리자 DM 전용
    // 
    if (isAdminDM) {

        if (content === "!") {
            msg.reply(
                "📌 [코스방] 관리자 명령 안내\n"
                + "(타방과 동시사용을 막기 위해 !! 로 사용)\n\n"
                + "!!삭제 (닉네임)  – 해당 유저 데이터 삭제\n"
                + "!!출석 (닉네임)  – 대리 출석 처리\n"
                + "!!출석초기화     – 오늘 출석 목록 초기화\n"
                + "!!데이터초기화   – 전체 유저 데이터 초기화\n"
                + "!!운세초기화     – 오늘 운세 초기화\n"
                + "!!퀴즈초기화     – 퀴즈 정답 기록 초기화\n"
                + "!!팀코등록 (내용)     – 팀코 항목 등록\n"
                + "!!트윈등록 (내용)     – 트윈 항목 등록\n"
                + "!!모집삭제 (코드)     – 코드로 항목 삭제\n"
                + "!!팀코전체초기화     – 팀코 목록 전체 삭제\n"
                + "!!트윈전체초기화     – 트윈 목록 전체 삭제\n"
                + "!!매핑초기화     – 해시↔닉네임 매핑 초기화 (신중!)\n"
                + "!!전체초기화     – 매핑 제외 전체 초기화"
            );
            return;
        }

        if (content.indexOf("!!삭제 ") === 0) {
            var delQuery = content.substring("!!삭제 ".length).replace(/^\s+|\s+$/g, "");
            if (!delQuery) { msg.reply("사용법: !!삭제 (닉네임)"); return; }
            deleteUserByName(delQuery, msg); return;
        }

        if (content.indexOf("!!출석 ") === 0) {
            var proxyQuery = content.substring("!!출석 ".length).replace(/^\s+|\s+$/g, "");
            if (!proxyQuery) { msg.reply("사용법: !!출석 (닉네임)"); return; }
            proxyAttendByName(proxyQuery, msg); return;
        }

        if (content === "!!출석초기화") {
            attendance = { dateKey: getTodayKey(), list: [] };
            var rh;
            for (rh in userData) {
                if (!userData.hasOwnProperty(rh)) continue;
                userData[rh].attend = 0;
                userData[rh].attendRanks = [];
            }
            saveAttendance(); saveUserData();
            msg.reply("✅ 출석 데이터를 초기화했어요."); return;
        }

        if (content === "!!데이터초기화") {
            userData = {};
            saveUserData();
            msg.reply("✅ 유저 데이터(채팅/포인트/출석/퀴즈)를 초기화했어요."); return;
        }

        if (content === "!!운세초기화") {
            fortune = { dateKey: getTodayKey(), data: {} };
            saveFortune();
            msg.reply("✅ 운세 데이터를 초기화했어요."); return;
        }

        if (content === "!!퀴즈초기화") {
            var qh;
            for (qh in userData) {
                if (userData.hasOwnProperty(qh)) userData[qh].quizCorrect = 0;
            }
            saveUserData();
            msg.reply("✅ 퀴즈 정답 기록을 초기화했어요."); return;
        }

        if (content.indexOf("!!팀코등록 ") === 0) {
            var tcContent = content.substring("!!팀코등록 ".length).replace(/^\s+|\s+$/g, "");
            if (!tcContent) { msg.reply("사용법: !!팀코등록 (내용)"); return; }
            addRecruit("TEAMCOS", tcContent, msg); return;
        }

        if (content.indexOf("!!트윈등록 ") === 0) {
            var twContent = content.substring("!!트윈등록 ".length).replace(/^\s+|\s+$/g, "");
            if (!twContent) { msg.reply("사용법: !!트윈등록 (내용)"); return; }
            addRecruit("TWIN", twContent, msg); return;
        }

        if (content.indexOf("!!모집삭제 ") === 0) {
            var delCode = content.substring("!!모집삭제 ".length).replace(/^\s+|\s+$/g, "");
            if (!delCode) { msg.reply("사용법: !!모집삭제 (코드)"); return; }
            deleteRecruitByCode(delCode, msg); return;
        }

        if (content === "!!팀코전체초기화") { clearRecruit("TEAMCOS", msg); return; }
        if (content === "!!트윈전체초기화") { clearRecruit("TWIN", msg); return; }

        if (content === "!!매핑초기화") {
            userMap = {};
            saveUserMap();
            msg.reply("✅ 해시↔닉네임 매핑을 초기화했어요.\n(다음 채팅 수신 전까지 닉네임 검색이 작동하지 않습니다.)"); return;
        }

        if (content === "!!멤버통계") {
            loadAll();
            var allKeys = [], hk;
            for (hk in userData) {
                if (userData.hasOwnProperty(hk)) allKeys.push(hk);
            }
            if (!allKeys.length) { msg.reply("저장된 유저 데이터가 없습니다."); return; }

            allKeys.sort(function (a, b) {
                var pa = userData[a] ? (userData[a].point || 0) : 0;
                var pb = userData[b] ? (userData[b].point || 0) : 0;
                return pb - pa;
            });

            var dmOut = "📦 전체 멤버 raw 데이터 (" + allKeys.length + "명)\n";
            var ki;
            for (ki = 0; ki < allKeys.length; ki++) {
                var hki = allKeys[ki];
                ensureUser(hki);
                var uki = userData[hki];
                var avgi = calcAvgRank(hki);
                dmOut += "———————————————\n"
                    + "[" + (ki + 1) + "] " + nameOf(hki) + "\n"
                    + "hash: " + hki + "\n"
                    + "점수: " + uki.point + " | 채팅: " + uki.chat + "\n"
                    + "출석: " + uki.attend + "일 | 평균등수: " + (avgi === null ? "N/A" : avgi.toFixed(2)) + "\n"
                    + "퀴즈정답: " + uki.quizCorrect + "\n"
                    + "뽑기: " + uki.drawCount + "회 (" + (uki.drawDate || "-") + ")\n"
                    + "마지막채팅: " + (uki.lastChatAt || "없음") + "\n"
                    + "출석등수기록: [" + (uki.attendRanks || []).join(", ") + "]\n";
            }
            msg.reply(dmOut); return;
        }

        if (content === "!!전체초기화") {
            userData = {};
            attendance = { dateKey: getTodayKey(), list: [] };
            fortune = { dateKey: getTodayKey(), data: {} };
            quizActive = false;
            currentQuiz = null;
            quizAnswered = {};
            saveUserData(); saveAttendance(); saveFortune();
            msg.reply("✅ 전체 데이터를 초기화했어요.\n(해시↔닉네임 매핑은 유지됩니다.)"); return;
        }

        return;  // 그 외 관리자 DM 무시
    }

    // 
    //  그룹 채팅방 (TARGET_ROOM)
    // 

    var displayName = senderName;
    var isAdmin = (ADMIN_NAMES.indexOf(senderName) !== -1);

    // 채팅 카운트 + 포인트 (관리자 제외)
    if (!isAdmin) {
        recordChat(senderHash);
        addChatPoint(senderHash);
        saveUserData();
    }

    //  퀴즈 진행 중: 퀴즈 관련 외 명령 차단 
    if (quizActive) {
        if (content.indexOf("!") === 0) {
            if (content.indexOf("정답") === 0) {
                submitAnswer(senderHash, displayName, content.replace(/^정답\s*/, ""), msg); return;
            }
            if (content === "!힌트") {
                msg.reply("💡 힌트: " + currentQuiz.hint); return;
            }
            if (content === "!종료") {
                stopQuiz(msg, "🛑 퀴즈를 종료했습니다."); return;
            }
            msg.reply("⛔️ 퀴즈 진행 중입니다.\n퀴즈 중에는 정답 / !힌트 / !종료 만 사용 가능합니다."); return;
        }
    }

    //  !트윈 / !팀코 목록 조회
    if (content === "!트윈") { listRecruit("TWIN", msg); return; }
    if (content === "!팀코") { listRecruit("TEAMCOS", msg); return; }

    //  !모집양식
    if (content === "!모집양식" || content === "/팀코홍보" || content === "/팀코홍보 ") {
        msg.reply(
            "[팀코 / 트윈 모집 양식]\n"
            + "(여기에 내용 입력)\n"
            + "모집자: (예: 이한)\n"
            + "대상: (예: 2000년 이후 출생의 남자만/여자만/무관)\n"
            + "시기: (예: 12서코 롯데월드 토요일)\n\n"
            + "‼️꼭 읽어주세요‼️\n"
            + " - 이 양식을 길게 눌러 복사 후 양식에 맞춰 작성해주세요.\n"
            + " - 예시 및 '꼭 읽어주세요' 내용은 전부 지우고 작성하세요.\n"
            + " - 등록 시 @이한 멘션 필수입니다. (안하면 등록이 누락됨)\n"
            + " - 수정이 절대로 불가하므로 신중히 작성해주세요\n"
            + " - 시기경과/마감/부적절한 내용/모집당사자 미응답 등의 사유가 발생한 글은 관리자가 임의로 삭제/수정/거부할 수 있습니다."
        );
        return;
    }


    //  !출석 (강제 출석) 
    if (content === "!출석") {
        if (isAdmin) { msg.reply("관리자는 출석 집계에서 제외됩니다."); return; }
        if (!isAttendanceTime()) {
            msg.reply("⏰ 출석 가능 시간이 아닙니다.\n\n[출석 가능 시간]\n(월~금) 07:00~12:00\n(토~일) 06:00~13:00"); return;
        }
        if (hasAttendedToday(senderHash)) {
            msg.reply(displayName + " 님은 이미 출석하셨어요. 😊"); return;
        }
        var fRes = doAttend(senderHash);
        var fGacha = doGachaBatch(senderHash);
        saveUserData(); saveAttendance();
        msg.reply(
            displayName + " 님,\n"
            + fRes.rank + "등으로 출석으로 " + fRes.earnedPoint + "점 적립했어요!\n\n"
            + formatGachaResults(fGacha.results) + "\n"
            + "총 " + (fRes.earnedPoint + fGacha.totalPoint) + "점 적립했어요.\n\n"
            + "⚠️경고⚠️\n"
            + "강제출석명령을 사용하셨습니다.\n"
            + "자동 출석을 우선으로 사용하여야 하며,\n자동 출석이 불가피한 경우 반드시 이한님께 말씀해주세요."
        );
        return;
    }

    //  자동 출석 
    if (isAttendanceTime() && !isAdmin && !hasAttendedToday(senderHash)) {
        var aRes = doAttend(senderHash);
        var aGacha = doGachaBatch(senderHash);
        saveUserData(); saveAttendance();
        msg.reply(
            displayName + " 님,\n"
            + aRes.rank + "등으로 출석으로 " + aRes.earnedPoint + "점 적립했어요!\n\n"
            + formatGachaResults(aGacha.results) + "\n"
            + "총 " + (aRes.earnedPoint + aGacha.totalPoint) + "점 적립했어요."
        );
    }

    //  !출석랭킹 — 오늘 출석 순서 
    if (content === "!출석랭킹") {
        var list = attendance.list;
        if (!list.length) {
            msg.reply("아직 아무도 출석하지 않았어요. 😢\n다들 자고있나...?"); return;
        }
        var rl = "📋 오늘의 아침출석 랭킹\n", ri;
        for (ri = 0; ri < list.length; ri++) {
            rl += (ri + 1) + "등: " + nameOf(list[ri].hash) + " " + medalOf(ri + 1) + "\n";
        }
        msg.reply(rl + "랭킹에 계신 분들 모두 축하합니다!"); return;
    }

    //  !출석통계 — 누적 출석일수 + 평균등수 
    if (content === "!출석통계") {
        var statRows = buildAttendRanking();
        if (!statRows.length) { msg.reply("아직 출석한 사용자가 없습니다. 😢"); return; }
        var stOut = "📊 누적 출석 통계\n", sti;
        for (sti = 0; sti < statRows.length; sti++) {
            var stMedal = medalOf(sti + 1);
            var stAvg = (statRows[sti].avg === null) ? "N/A" : statRows[sti].avg.toFixed(2);
            stOut += (sti + 1) + "위 " + statRows[sti].name + (stMedal ? " " + stMedal : "")
                + " – " + statRows[sti].attend + "일 출석 | 평균 " + stAvg + "등\n";
        }
        msg.reply(stOut.replace(/\n$/, "") + "\n\n상위권에 계신 분들 모두 축하합니다!"); return;
    }

    //  !나 
    if (content === "!나") {
        msg.reply("나의 정보 [" + displayName + "]\n" + userInfoText(senderHash)); return;
    }

    //  !남 (검색어) — 포함 검색, 다중 결과 지원 
    if (content.indexOf("!남 ") === 0) {
        var nmQuery = content.substring("!남 ".length).replace(/^\s+|\s+$/g, "");
        if (!nmQuery) { msg.reply("사용법: !남 (닉네임 검색어)"); return; }
        var hits = findHashesByName(nmQuery);
        if (!hits.length) { msg.reply("[" + nmQuery + "] 에 해당하는 유저가 없어요."); return; }
        var nmOut = "", hi2;
        for (hi2 = 0; hi2 < hits.length; hi2++) {
            nmOut += (hi2 > 0 ? "\n\n" : "") + nameOf(hits[hi2]) + " 님의 정보\n" + userInfoText(hits[hi2]);
        }
        msg.reply(nmOut); return;
    }

    //  !멤버통계 — 점수순, 전체 정보, 1~3위 메달 
    if (content === "!멤버통계") {
        var mrows = buildMemberStats();
        if (!mrows.length) { msg.reply("아직 멤버 통계를 표시할 데이터가 없어요. 😢"); return; }
        var mout = "📈 멤버 통계 (점수 순)\n", mi;
        for (mi = 0; mi < mrows.length; mi++) {
            var mm = medalOf(mi + 1);
            var mr = mrows[mi];
            var mAvg = (mr.avg === null) ? "N/A" : mr.avg.toFixed(2);
            var mqr = quizRankOf(mr.hash);
            mout += "———————————————\n"
                + (mi + 1) + "위 " + mr.name + (mm ? " " + mm : "") + "\n"
                + "점수 " + mr.point + "점 | 채팅수 " + mr.chat + "개\n"
                + "출석 " + mr.attend + "일 | 출석 평균등수 " + mAvg + "위\n"
                + "퀴즈 정답 " + mr.quizCorrect + "회 | 퀴즈 랭킹 " + (mqr ? mqr + "위" : "기록 없음") + "\n"
                + "마지막 채팅 " + mr.lastChatAt
                + (mi < mrows.length - 1 ? "\n" : "");
        }
        msg.reply(mout); return;
    }

    //  !퀴즈랭킹 — quizCorrect >= 1 만 포함 
    if (content === "!퀴즈랭킹") {
        var qrows = buildQuizRanking();
        if (!qrows.length) { msg.reply("아직 퀴즈를 맞힌 사람이 없습니다. '!퀴즈'로 도전해보세요!"); return; }
        var qout = "🏆 퀴즈 랭킹 (누적 정답 수)\n", qi, qtotal = 0;
        for (qi = 0; qi < qrows.length; qi++) {
            qout += (qi + 1) + "위 " + qrows[qi].name + " " + medalOf(qi + 1) + " – " + qrows[qi].correct + "회\n";
            qtotal += qrows[qi].correct;
        }
        msg.reply(qout + "\n📦 전체 맞춘 횟수 합계: " + qtotal + "회"); return;
    }

    //  퀴즈 명령어 
    if (content === "!퀴즈") { startQuizRound(msg); return; }

    if (content === "!힌트") {
        if (!quizActive || !currentQuiz) { msg.reply("지금은 진행 중인 퀴즈가 없습니다."); return; }
        msg.reply("💡 힌트: " + currentQuiz.hint); return;
    }

    if (content.indexOf("정답") === 0) {
        submitAnswer(senderHash, displayName, content.replace(/^정답\s*/, ""), msg); return;
    }

    if (content === "!종료") {
        stopQuiz(msg, "🛑 퀴즈를 종료했습니다."); return;
    }

    //  !명언 
    if (content === "!명언") {
        msg.reply(quotes[Math.floor(Math.random() * quotes.length)]); return;
    }

    //  밥 / 디저트 추천 
    if (content === "!밥" || content === "밥" || content === "점메추" || content === "저메추" || content === "메뉴추천") {
        msg.reply(displayName + " 님,\n오늘은 '" + foodList[Math.floor(Math.random() * foodList.length)] + "' 어떠세요? 🍽️"); return;
    }
    if (content === "!디저트" || content === "디저트" || content === "후식" || content === "후식추천") {
        msg.reply(displayName + " 님,\n디저트는 '" + dessertList[Math.floor(Math.random() * dessertList.length)] + "' 추천드려요! 🍰"); return;
    }

    //  !운세 
    if (content === "!운세") {
        if (!fortune.data[senderHash]) {
            fortune.data[senderHash] = fortunes[Math.floor(Math.random() * fortunes.length)];
            saveFortune();
        }
        var nums = [], ni, rnum, dup;
        while (nums.length < 6) {
            rnum = Math.floor(Math.random() * 45) + 1;
            dup = false;
            for (ni = 0; ni < nums.length; ni++) { if (nums[ni] === rnum) { dup = true; break; } }
            if (!dup) nums.push(rnum);
        }
        nums.sort(function (a, b) { return a - b; });
        msg.reply(
            displayName + " 님의 오늘의 운세입니다. 🔮\n\n"
            + fortune.data[senderHash]
            + "\n\n🎲 로또 추천 번호: " + nums.join(", ")
            + "\n주의사항: 해당 기능은 당첨여부를 보장하지 않습니다."
        );
        return;
    }

    // !뽑기확률
    if (content === "!뽑기확률") {
        msg.reply(
            "🎰 뽑기 확률 안내\n"
            + "———————————————\n"
            + "🌟 ANOTHER GRADE – 0.1% (+200점)\n"
            + "🥇 1등 – 1% (+100점)\n"
            + "🥈 2등 – 5% (+20점)!\n"
            + "🥉 3등 – 10% (+10점)\n"
            + "4등 – 20% (+5점)\n"
            + "5등 – 63.9% (꽝, 채팅 점수만 적립)\n"
            + "———————————————\n"
            + "매일 아침 출석 시 자동으로 5회 진행됩니다."
        );
        return;
    }

    //  고정 멘트 
    if (content.indexOf("반가워요! 이왕") === 0) { msg.reply("안녕하세요! 공지 읽고, 오픈프로필로 바꿔주세요!\n우리 잘 지내봐요 😊"); return; }
    if (content.indexOf("보이스룸이 방금") === 0) { msg.reply("보이스룸이 시작되었어요! 이번에는 어떤 이야기들이 오갈까요?!"); return; }
    if (content.indexOf("보이스룸 종료") === 0) { msg.reply("보이스룸이 종료되었습니다. 모두 수고하셨습니다!"); return; }
    if (content.indexOf("안녕하세요") === 0) { msg.reply("반가워요! 🙌"); return; }

    if (content === "!안녕" || content === "!안녕하세요" || content === "/억지응답") {
        msg.reply("(왜인지는 모르겠지만 이 메시지에 응답을 해야할 것 같다는 느낌이 든다)"); return;
    }
    if (content === "!생존확인" || content === "!생존신고" || content === "java") {
        msg.reply("이 메시지가 전송된다면 살아있다는 것 입니다."); return;
    }
    if (content === "!코스" || content === "!코스프레" || content === "cos") {
        msg.reply("이 메시지가 전송된다면 이한봇도 코스프레를 하고싶다는 것 입니다."); return;
    }

    //  도움말 
    if (content === "!") {
        msg.reply(
            "📌 이한봇 기능안내 💬\n\n"
            + "서로 어울리기!\n"
            + " • !트윈 – 트윈 모집 정보\n"
            + " • !팀코 – 팀코 모집 정보\n"
            + " • !모집양식 – 트윈/팀코 홍보신청양식\n\n"
            + "출석하기\n"
            + " • 아침에 채팅치면 자동으로 출석 + 뽑기 5회! 🎉\n"
            + " • !출석랭킹 – 오늘 출석 순서 📋\n"
            + " • !출석통계 – 누적 출석일수 + 평균등수 📊\n\n"
            + "나와 남을 아는 시간\n"
            + " • !나 – 내 정보 보기 🧑‍💻\n"
            + " • !남 (닉네임) – 닉네임 포함 검색 👤\n"
            + " • !멤버통계 – 전체 멤버 종합 통계 📈\n\n"
            + "랜덤의 맛\n"
            + " • !밥 / !디저트 – 음식 추천 🍽️🍰\n"
            + " • !명언 / !운세 – 명언 또는 오늘의 운세 🔮\n"
            + " • !뽑기확률 – 출석 뽑기 당첨 확률 고지\n\n"
            + "퀴즈 (하루 10문제 한정)\n"
            + " • !퀴즈 – 퀴즈 시작\n"
            + " • !퀴즈랭킹 – 퀴즈 정답 누적 랭킹 🏆\n\n"
            + "문제 발생 시 관리자에게 문의해주세요.\n"
            + "VERSION: " + VERSION
        );
        return;
    }

    if (content === "!주의사항") {
        msg.reply(
            "⚠️ 주의사항\n"
            + "1. 채팅봇은 원활한 구동을 보장하지 않습니다.\n"
            + "2. 채팅/출석 기록은 관련 법률에 따라 주기적으로 초기화되며, 최장 1년 보존 후 삭제될 수 있습니다.\n"
            + "3. 주기적 점검으로 기능이 일시 중단될 수 있습니다.\n"
            + "4. 로또 번호는 당첨을 보장하지 않습니다.\n"
            + "5. 사진/이모티콘은 인식하지 않을 수 있습니다.\n"
            + "6. 이 봇은 AI가 아닙니다. 정확한 답변을 요구하지 마세요."
        );
        return;
    }

    if (content === "!브리핑") {
        msg.reply(
            "매일 아침에 제공되는 AI기반 브리핑 서비스입니다.\n"
            + "❗️참고사항❗️\n"
            + " ▪︎ 기상상황은 예측에서 벗어날 수 있습니다.\n"
            + " ▪︎ 기상관측위치 기준은 각 시•도청 또는 전지역 기온/날씨의 평균입니다.\n"
            + " ▪︎ AI가 반환한 정보에는 잘못된 정보가 있을 수 있습니다.\n"
            + " ▪︎ 특정 방/사용자의 공식 입장이 아닙니다."
        );
        return;
    }

    if (content === "!결석" || content === "!석출" || content === "석출" || content === "!노잼") {
        msg.reply("재미없어요 😑"); return;
    }

    //  확률성 응답 (70%) 
    if (Math.random() < 0.7) {
        if (content === "ㅋ") { msg.reply("ㅋ"); return; }
        if (content === "ㅎ") { msg.reply("ㅎ"); return; }
        if (content.indexOf("/이멀전시") === 0) {
            msg.reply("여기, 이한봇이 있어요!\n심심하시면 이한봇을 사용해 보는 것은 어떨까요?\n\n! 만 입력 후 전송하시면 사용방법 나와요"); return;
        }
    }
});

// 액티비티 이벤트
bot.addListener("activityCreate", function (activity) {
    loadAll();

    App.runOnUiThread(function () {
        var ctx = App.getContext();

        var scrollView = new android.widget.ScrollView(ctx);
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(android.widget.LinearLayout.VERTICAL);
        layout.setPadding(24, 24, 24, 24);

        var title = new android.widget.TextView(ctx);
        title.setText("CosBot v" + VERSION + " — 멤버 랭킹");
        title.setTextSize(18);
        title.setTextColor(android.graphics.Color.BLACK);
        title.setPadding(0, 0, 0, 16);
        layout.addView(title);

        var rows = buildMemberStats();

        if (!rows.length) {
            var empty = new android.widget.TextView(ctx);
            empty.setText("아직 멤버 데이터가 없습니다.");
            empty.setTextColor(android.graphics.Color.DKGRAY);
            layout.addView(empty);
        } else {
            var i, row, tv, medal, divider, lp;
            for (i = 0; i < rows.length; i++) {
                row = rows[i];
                medal = (i === 0) ? "🥇 " : (i === 1) ? "🥈 " : (i === 2) ? "🥉 " : "";

                tv = new android.widget.TextView(ctx);
                tv.setText(
                    (i + 1) + "위 " + medal + row.name + "\n"
                    + "  점수: " + row.point + "점 | 채팅: " + row.chat + "개\n"
                    + "  출석: " + row.attend + "일 | 퀴즈: " + row.quizCorrect + "회\n"
                    + "  hash: " + row.hash
                );
                tv.setTextSize(13);
                tv.setTextColor(android.graphics.Color.DKGRAY);
                tv.setPadding(0, 8, 0, 8);

                divider = new android.widget.View(ctx);
                divider.setBackgroundColor(android.graphics.Color.LTGRAY);
                lp = new android.widget.LinearLayout.LayoutParams(
                    android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1
                );
                divider.setLayoutParams(lp);

                layout.addView(tv);
                layout.addView(divider);
            }
        }

        scrollView.addView(layout);
        activity.setContentView(scrollView);  // setContentView는 activity 객체로
    });
});

bot.addListener("activityStart", function () { });
bot.addListener("activityResume", function () { });
bot.addListener("activityPause", function () { });
bot.addListener("activityStop", function () { });