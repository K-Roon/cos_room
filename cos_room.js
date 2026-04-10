/*
코스어가 되어버려 채팅방 전용 봇
*/

var bot = BotManager.getCurrentBot();

/***** 방 이름 상수 *****/
var TARGET_ROOM = "코스어가 되어버려✨";
var ADMIN_NAME = "권재현";

/***** 파일 상수 *****/
var CHAT_FILE = "chatCountList.txt";
var ATTENDANCE_FILE = "attendance_list.txt";
var ATTENDANCE_STAT_FILE = "attendance_stats.txt";
var DATE_FILE = "last_date.txt";
var FORTUNE_FILE = "fortuneList.txt";
var POINT_FILE = "memberPoints.txt";
var QUIZ_STAT_FILE = "quiz_stats.txt";

/***** 고정 이모지 → 고정 닉 *****/
var identifierEmojiMap = {
    "이한": "이한",
    "💜": "루밍",
};

var foodList = ["비빔밥", "불고기", "김치찌개", "된장찌개", "순두부찌개", "갈비탕", "설렁탕", "육개장", "삼계탕", "닭볶음탕", "보쌈", "족발", "제육볶음", "고등어조림", "갈치조림", "김치볶음밥", "볶음밥", "참치김밥", "치즈김밥", "돈까스", "치즈돈까스", "우동", "냉면", "물냉면", "비빔냉면", "잔치국수", "칼국수", "쫄면", "떡볶이", "순대", "오뎅", "라면", "참깨라면", "김치라면", "짜장면", "짬뽕", "마라탕", "샤브샤브", "스시", "연어덮밥", "규동", "텐동", "가츠동", "라멘", "우나기동", "차슈라멘", "피자", "치킨", "양념치킨", "후라이드치킨", "간장치킨", "마늘치킨", "핫윙", "버팔로윙", "파스타", "토마토파스타", "크림파스타", "알리오올리오", "라자냐", "리조또", "스테이크", "함박스테이크", "샐러드", "샌드위치", "햄버거", "불고기버거", "치즈버거", "더블치즈버거", "감자튀김", "핫도그", "토스트", "오므라이스", "김말이튀김", "군만두", "고로케", "베이컨덮밥", "닭갈비", "철판볶음밥", "삼겹살", "목살구이", "돼지불백", "차돌박이", "양꼬치", "곱창전골", "막창구이", "해물파전", "부추전", "계란말이", "소세지볶음", "참치마요덮밥", "우엉조림", "버섯전골", "새우튀김", "해물찜", "회덮밥", "알밥", "쭈꾸미볶음", "낙지덮밥", "돌솥비빔밥", "도시락", "도루묵구이", "청국장", "코다리조림", "에그마요 샌드위치", "소세지 도시락", "미트볼 스파게티", "피자토스트", "치킨너겟", "옥수수버터구이", "계란볶음밥", "스팸구이", "치즈스틱", "베이컨말이", "모짜렐라치즈핫도그", "콘치즈", "감자범벅", "크림리조또", "스위트콘전", "스마일감자", "에그스크램블", "스크램블 토스트", "햄치즈토스트", "치즈오믈렛", "카레라이스", "떡갈비", "유부초밥", "치킨마요덮밥", "베이컨김치볶음밥", "누룽지탕", "베이비파스타", "플레인우동", "미니핫도그", "수제피자", "후라이드만두", "치킨까스", "어린이돈까스", "냉모밀", "치즈볶음밥", "멜론바볶음밥", "감자치즈볼", "푸딩젤리도시락"];
var dessertList = ["초코 케이크", "치즈 케이크", "딸기 생크림 케이크", "레드벨벳 케이크", "녹차 케이크", "당근 케이크", "밀크레이프", "크렘브륄레", "티라미수", "마카롱", "휘낭시에", "마들렌", "에클레어", "슈크림", "푸딩", "젤리", "타르트", "레몬 타르트", "애플파이", "브라우니", "머핀", "초코칩 쿠키", "오레오 쿠키", "수제쿠키", "찹쌀떡", "인절미", "약과", "호떡", "붕어빵", "계란빵", "꽈배기", "와플", "아이스크림", "바닐라 아이스크림", "초코 아이스크림", "녹차 아이스크림", "젤라또", "빙수", "팥빙수", "망고빙수", "딸기빙수", "연유토스트", "허니브레드", "크로플", "팬케이크", "롤케이크", "콩떡", "도넛", "카라멜 푸딩", "타피오카 버블", "탕후루"];
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
    "성공은 평범함을 반복하는 비범한 능력이다. - 조지프 루",
    "명언보다 물 한 잔이 더 낫다. - 헬스봇",
    "완벽을 찾기보다 꾸준함을 찾아라. - 익명",
    "모든 날이 좋을 수는 없지만, 모든 날엔 좋은 일이 있다. - 위로의 명언",
    "시간이 없다는 건 핑계다. 의지가 없다는 뜻이다. - 냉철한 현실",
    "명언을 외우지 말고, 자신만의 명언을 써라. - 작가의 조언",
    "세상은 노력하는 자를 시험하지만, 결국 돕는다. - 현실 철학",
    "행복은 결과가 아니라 선택이다. - 미상",
    "오늘도 포기하지 마라. 내일의 당신이 고마워할 것이다. - 동기부여봇",
    "훼손될 명예밖에 없다면, 애초에 명예는 없던 것이다. - 냉철한 진실",
    "남 탓하기 전에 거울을 봐라. 그 안에 원인이 있다. - 현실",
    "운이 나쁜 게 아니라, 준비가 없던 것이다. - 냉정한 사실",
    "노력은 배신하지 않는다. 하지만 대부분은 포기한다. - 현실주의자",
    "사람은 변하지 않는다. 단지 들키지 않을 뿐이다. - 인간관찰자",
    "세상은 공평하다. 노력 안 한 만큼만 불행해진다. - 냉정한 통계",
    "자존심은 굶주린 배를 채워주지 않는다. - 현실",
    "세상이 널 싫어하는 게 아니다. 그냥 관심이 없다. - 냉소적 위로",
    "비판을 두려워하지 마라. 아무도 널 그만큼 신경 쓰지 않는다. - 현실 조언",
    "실패를 두려워할 시간에 이미 누군가는 성공했다. - 시간관리자",
    "넌 준비가 안 됐을 뿐, 운이 없는 게 아니다. - 현실적인 말",
    "결단이 없으면, 변명만 남는다. - 냉정한 리더",
    "명예를 지키려다 인생을 잃는다면, 그 명예는 이미 죽었다. - 잔혹한 진실",
    "불평은 세금을 내지 않는다. 대신 시간과 기회를 잃는다. - 현실주의자",
    "세상은 널 시험하지 않는다. 그냥 무관심할 뿐이다. - 현실 통찰",
    "노력 없는 자는 운을 탓하고, 운 좋은 자는 더 노력한다. - 냉정한 교훈",
    "위로는 일시적이지만, 게으름은 평생이다. - 현실",
    "성공은 운이 아니라 습관이다. 네 습관을 봐라. - 냉철한 관찰자",
    "불행한 이유를 찾지 말고, 행동하지 않는 이유를 찾아라. - 진실의 말",
    "자기연민은 가장 달콤한 독이다. - 냉정한 심리학자",
    "'나중에'라는 말은 '안 하겠다'의 예의 있는 표현이다. - 팩트폭격기",
    "인생은 불공평하다. 하지만 대부분은 그걸 핑계로 삼는다. - 냉철한 진실",
    "네 한숨이 세상을 바꾸지 않는다. 행동만이 바꾼다. - 현실파",
    "세상은 네가 힘든 걸 몰라준다. 왜냐면 모두 힘드니까. - 잔혹한 사실",
    "진짜 문제는 환경이 아니라 태도다. - 냉철한 현실주의자",
    "노력한다고 다 성공하지는 않는다. 하지만 노력 안 하면 100% 실패한다. - 수학적 진리",
    "자존감은 행동으로 채워야 한다. 말로는 못 만든다. - 실용주의자",
    "운이 나쁘다 말하지 마라. 준비되지 않은 자에게 행운은 재앙이다. - 현실의 경고",
    "네가 하는 변명 중 절반은 네 자신도 믿지 않는다. - 직설적 진실",
    "겸손은 좋지만, 자신감 없는 겸손은 변명일 뿐이다. - 현실주의자",
    "결국 아무도 네 인생을 대신 살아주지 않는다. - 궁극의 팩트",
    "모두가 널 응원하는 건, 아직 널 위협으로 느끼지 않기 때문이다. - 냉소적 현실",
    "자기계발서는 읽는다고 변하지 않는다. 실행해야 변한다. - 냉정한 충고",
    "성공한 사람은 기회를 기다리지 않는다. 만들어낸다. - 현실적 리더",
    "운보다 무서운 건 꾸준함이다. - 냉철한 사실",
    "눈치를 본다고 인생이 쉬워지진 않는다. - 현실통찰",
    "세상은 널 오해하지 않는다. 넌 그냥 설명이 부족한 거다. - 냉정한 시선",
    "실패가 두렵다는 건, 사실 아직 진심이 아니라는 뜻이다. - 잔혹한 명언",
    "나중이란 단어를 쓰는 순간, 지금은 사라진다. - 현실 시계",
    "게으름은 재능의 가장 효율적인 파괴자다. - 팩트 공격",
    "자신을 속이는 순간, 세상은 널 알아본다. - 냉소적 경고",
    "운명은 기다리는 게 아니라, 선택하는 것이다. - 현실철학",
    "명예는 행동이 만든다. 말로 쌓인 명예는 입김 하나에 무너진다. - 냉철한 명언",
    "불행한 사람의 공통점: 이유는 많고, 행동은 없다. - 현실 분석",
    "네가 진짜로 원한다면, 이미 움직였을 것이다. - 직설의 미학",
    "성공한 척하는 데 쓴 에너지를 진짜 행동에 써라. - 팩트폭격",
    "운명 탓은 게으름의 시적 표현이다. - 냉소적 진실",
    "누구도 널 구하러 오지 않는다. 이건 영화가 아니다. - 현실 종결자",
    "현실을 인정하는 순간, 인생이 시작된다. - 냉철한 결론"
];

var QUIZ_BANK = [
    { q: "세상에서 가장 억울한 도형은?", a: ["원통"], hint: "가장 억울할 때 'ㅇㅌ'하다 라고 하지요." },
    { q: "화장실이 둥둥 떠있으면?", a: ["공중화장실"], hint: "ㄱㅈ화장실 이라고 하죠" },
    { q: "전화기가 둥둥 떠있으면?", a: ["공중전화", "공중전화기"], hint: "이건 사회기반시설 중 하나로, 이용률이 적어도 철거하지 않습니다." },
    { q: "카트에 만두가 있으면 뭘까?", a: ["카트만두"], hint: "네팔의 수도입니다." },
    { q: "소가 번개에 맞아 죽으면 뭘까? (5음절)", a: ["우사인볼트"], hint: "운동선수 이름입니다." },
    { q: "'비가 1시간 동안 내린다'를 다른말로 뭐라고 할까? (붙여서 쓸 것)", a: ["추적60분"], hint: "방송 프로그램 이름입니다." },
    { q: "어부들이 싫어하는 가수는?", a: ["배철수"], hint: "유명 가수 이름입니다. MBC FM4U 에서 DJ도 하고 있습니다." },
    { q: "제상에서 제일 예쁜 풀은?", a: ["뷰티풀"], hint: "남자들이 이걸로 드립치죠. 얼굴에 풀 묻었다고." },
    { q: "화상입고 하는 전화는?", a: ["화상전화"], hint: "얼굴을 보고 전화를 하는걸 이거라고 하죠." },
    { q: "D가 20개씩 있으면 뭘까?", a: ["스무디"], hint: "디가 스무개 있으면 이거죠." },
    { q: "소가 불에 타면?", a: ["불소"], hint: "치아에 이걸 코팅하면 충치를 예방할 수 있다고 알려져 있습니다." },
    { q: "서울에서 가장 가난한 동은?", a: ["일원동"], hint: "실제 지명 이름입니다." },
    { q: "(넌센스) 호주에서 쓰는 돈은?", a: ["호주머니"], hint: "호주달러는 아닙니다. 호주가 들어가는건 맞아요." },
    { q: "싱가포르의 수도는?", a: ["싱가포르"], hint: "아... 이건 정말 쉬운데..." },
    { q: "USA 다음은?", a: ["USB"], hint: "범용직렬버스라고 불리우는 것입니다." },
    { q: "'성씨가 똑같다'를 3글자로 줄이면?", a: ["성동일"], hint: "유명인 이름입니다." },
    { q: "'물속에 들어가 걷는다'를 4글자로 뭐라고 할까?", a: ["입수보행"], hint: "군대용어로, 양 손을 주머니에 넣고 보행하는 행위를 말합니다." },
    { q: "바깥에서 탈모인게 들통나면? (4글자)", a: ["실외탈모"], hint: "군대용어로, 실외에서 모자를 쓰지 않고 돌아다니는 행위를 말합니다." },
    { q: "혀가 거짓말할 때 쓰는 말은? (붙여서 쓸 것, 기호는 쓰지말것)", a: ["전혀아닙니다"], hint: "극구 부정할 때 쓰는 말이기도 합니다." },
    { q: "화장실에서 막 나온 사람은? (4글자)", a: ["일본사람", "일본인"], hint: "화장실에서 막 나왔다면, 볼 일을 본 사람이겠죠?" },
    { q: "김소월이 수능을 볼 때 수리 '가'형을 보는 이유는? (붙여서 쓸 것, 김소월 시집 참고, 7글자)", a: ["나보기가역겨워", "나보기가역겨워서"], hint: "김소월 시집을 참고해주세요." },
    { q: "소가 구걸을 하면?", a: ["우거지"], hint: "이거 맛있는데... 국밥땡기네요..." },
    { q: "슈퍼주니어 신동 옆에 있으면 뭐라고 할까? (3글자)", a: ["신동엽"], hint: "SNL에 자주 나오는 유명인 이름입니다." },
    { q: "과자가 자기소개하면? (3글자)", a: ["전과자"], hint: "범죄를 저지른 이력이 있는 사람" },
    { q: "소가 인스타를 하면?", a: ["소셜네트워크"], hint: "인스타그램, 페이스북, X 등을 포괄적으로 이르는 말입니다." },
    { q: "'암소의 시대'를 4글자로 뭐라고 할까?", a: ["소녀시대"], hint: "" },
    { q: "소가 공포에 떨면?", a: ["소름", "소오름"], hint: "진짜 __돋네요." },
    { q: "'소가 외롭다'를 3글자로 뭐라고 할까?", a: ["소외감", "소외"], hint: "" },
    { q: "소가 아플땐 무슨 약을 먹을까? (3글자)", a: ["소염제"], hint: "진통OOO을 먹기도 하죠." },
    { q: "'교통사고'를 다른 말로 뭐라고 할까? (3글자)", a: ["붕어빵"], hint: "겨울하면 이거죠." },
    { q: "차가 다니는 도로에 갑작스럽게 사람이 뛰어들면?", a: ["카놀라유"], hint: "Car가 놀라겠어유. 식용유 종류 중 하나여유." },
    { q: "입모양이 S자인 사람을 뭐라고 할까? (영어 대문자, 3음절)", a: ["EBS", "이비에스"], hint: "한국교육방송공사의 영어 약어입니다." },
    { q: "소가 시끄러우면? (2글자)", a: ["소란"], hint: "왜 이렇게 _ _ 이야!! 시끄러워 죽겠네!!" },
    { q: "달에서 쓰는 언어는?", a: ["문어"], hint: "달은 영어로 Moon, 그리고 한자로 語를 붙여보세요." },
    { q: "소가 죽으면 다이소, 그러나 죽은 소가 많으면?", a: ["산소부족"], hint: "H² 부족" },
    { q: "양이 돈을 벌어서 내는 세금은 뭘까? (5글자)", a: ["양도소득세"], hint: "재화를 양도할 때 내는 세금입니다." },
    { q: "할아버지가 등산하면?", a: ["산타할아버지"], hint: "호호호" },
    { q: "'할아버지! 산에서 불이나요!'를 6글자로 줄이면?", a: ["산타할아버지"], hint: "호호호" },
    { q: "쟤는 포도다! 를 3글자로 줄이면?", a: ["포도당"], hint: "당 중의 하나입니다." },
    { q: "햄버거의 색깔은?", a: ["버건디"], hint: "색깔 이름입니다." },
    { q: "소가 그림을 그리면?", a: ["피카소"], hint: "소로 끝나는 유명 화가 이름입니다." },
    { q: "소는 어디에서 쉴까?", a: ["휴게소", "우편함"], hint: "일반적으로 고속도로에 있어요." },
    { q: "돈 대신 사과를 지불하면 뭘까? (4글자)", a: ["애플페이", "Apple Pay"], hint: "Apple의 결제방식 입니다. (한국어로 입력하세요)" },
    { q: "물이 총을 들고 있으면?", a: ["물건"], hint: "물총, 워터건 다 아닙니다. 물은 맞는데 총을 영어로 생각해보셔요." },
    { q: "세상에서 가장 쉬운 숫자는? (답 입력시 숫자만 입력)", a: ["190000"], hint: "아라비아숫자로 입력하세요." },
    { q: "로봇이 좋아하는 치킨 부위는?", a: ["윙"], hint: "로봇은 윙~ 치킨~ 하고 움직이죠." }
];

/***** 런타임 메모리 *****/
var attendanceList = {};
var attendanceStats = {};
var chatCount = {};
var memberPoints = {};
var lastDate = "";
var fortuneList = {};
var quizStats = {};

var quizActive = false;
var currentQuiz = null;
var quizAnswered = null;
var usedQuizIdsToday = {};
var todaysQuizOrder = [];
var todaysQuizOrderDateKey = null;

/***** 유틸 *****/
function nowLocal() { return new Date(); }

function pad2(n) { return (n < 10 ? "0" : "") + n; }

function toKSTString(d) {
    try {
        return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate())
            + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds());
    } catch (e) {
        var n = new Date();
        return n.getFullYear() + "-" + pad2(n.getMonth() + 1) + "-" + pad2(n.getDate())
            + " " + pad2(n.getHours()) + ":" + pad2(n.getMinutes()) + ":" + pad2(n.getSeconds());
    }
}

function getTodayKey() {
    var k = nowLocal();
    return k.getFullYear() + "." + (k.getMonth() + 1) + "." + k.getDate();
}

function getUnifiedSenderName(sender) {
    var emoji;
    for (emoji in identifierEmojiMap) {
        if (identifierEmojiMap.hasOwnProperty(emoji)) {
            if (sender.indexOf(emoji) !== -1) return identifierEmojiMap[emoji];
        }
    }
    return sender;
}

function ensureChatRecord(name) {
    if (!chatCount[name]) { chatCount[name] = { count: 0, lastChatAt: null }; return; }
    if (typeof chatCount[name] === "number") { chatCount[name] = { count: chatCount[name], lastChatAt: null }; }
    if (typeof chatCount[name].count !== "number") { chatCount[name].count = 0; }
    if (typeof chatCount[name].lastChatAt !== "string" && chatCount[name].lastChatAt !== null) { chatCount[name].lastChatAt = null; }
}

function addChatCountAndStamp(name) {
    ensureChatRecord(name);
    chatCount[name].count += 1;
    chatCount[name].lastChatAt = toKSTString(new Date());
}

function isDoubleUpTime() {
    var now = nowLocal();
    var day = now.getDay();
    var isWeekend = (day === 0 || day === 6);
    var minutes = now.getHours() * 60 + now.getMinutes();
    var ranges = isWeekend ? [[30, 360], [780, 900]] : [[30, 419], [720, 900]];
    var i;
    for (i = 0; i < ranges.length; i++) {
        if (minutes >= ranges[i][0] && minutes < ranges[i][1]) return true;
    }
    return false;
}

function addPoints(name, base) {
    if (name === ADMIN_NAME) return;
    if (!memberPoints[name]) memberPoints[name] = 0;
    memberPoints[name] += isDoubleUpTime() ? base * 2 : base;
}

function addQuizPointFixed(name) {
    if (name === ADMIN_NAME) return;
    if (!memberPoints[name]) memberPoints[name] = 0;
    memberPoints[name] += 5;
}

/***** 데이터 로드/저장 *****/
function loadData() {
    var raw, k;
    try { attendanceList = JSON.parse(Database.readString(ATTENDANCE_FILE) || "{}"); } catch (e) { attendanceList = {}; }
    try { attendanceStats = JSON.parse(Database.readString(ATTENDANCE_STAT_FILE) || "{}"); } catch (e) { attendanceStats = {}; }
    try {
        raw = Database.readString(CHAT_FILE) || "{}";
        chatCount = JSON.parse(raw);
        for (k in chatCount) { if (chatCount.hasOwnProperty(k)) ensureChatRecord(k); }
    } catch (e) { chatCount = {}; }
    try { memberPoints = JSON.parse(Database.readString(POINT_FILE) || "{}"); } catch (e) { memberPoints = {}; }
    try { lastDate = Database.readString(DATE_FILE) || getTodayKey(); } catch (e) { lastDate = getTodayKey(); }
    try { quizStats = JSON.parse(Database.readString(QUIZ_STAT_FILE) || "{}"); } catch (e) { quizStats = {}; }
}

function saveData() {
    try {
        Database.writeString(ATTENDANCE_FILE, JSON.stringify(attendanceList));
        Database.writeString(ATTENDANCE_STAT_FILE, JSON.stringify(attendanceStats));
        Database.writeString(CHAT_FILE, JSON.stringify(chatCount));
        Database.writeString(POINT_FILE, JSON.stringify(memberPoints));
        Database.writeString(DATE_FILE, lastDate);
        Database.writeString(QUIZ_STAT_FILE, JSON.stringify(quizStats));
    } catch (e) { console.error("저장 오류: " + e); }
}

/***** 날짜 리셋 *****/
function resetAttendanceIfNewDay() {
    var today = getTodayKey();
    if (today !== lastDate) {
        attendanceList = {};
        fortuneList = {};
        lastDate = today;
        saveData();
    }
}

function resetQuizIfNewDay() {
    var today = getTodayKey();
    if (todaysQuizOrderDateKey !== today) {
        usedQuizIdsToday = {};
        todaysQuizOrder = [];
        todaysQuizOrderDateKey = today;
    }
}

/***** 시간 판단 *****/
function isAttendanceTime() {
    var now = nowLocal();
    var day = now.getDay();
    var isWeekend = (day === 0 || day === 6);
    var minutes = now.getHours() * 60 + now.getMinutes();
    var start = isWeekend ? 360 : 420;
    var end = isWeekend ? 780 : 720;
    return minutes >= start && minutes <= end;
}

function isQuizTime() {
    var now = nowLocal();
    var minutes = now.getHours() * 60 + now.getMinutes();
    return minutes >= 0 && minutes <= (23 * 60 + 30);
}

/***** 출석 처리 *****/
function hasAttendedToday(name) {
    var today = getTodayKey();
    var i;
    if (!attendanceList[today]) return false;
    for (i = 0; i < attendanceList[today].length; i++) {
        if (getUnifiedSenderName(attendanceList[today][i].sender) === name) return true;
    }
    return false;
}

function calcRankBasePoint(rank) {
    return (rank >= 1 && rank <= 5) ? (21 - rank) : 10;
}

function addRankPoints(name, rank) {
    if (name === ADMIN_NAME) return 0;
    if (!memberPoints[name]) memberPoints[name] = 0;
    var base = calcRankBasePoint(rank);
    memberPoints[name] += base;
    return base;
}

function pushAttendance(unifiedName) {
    var today = getTodayKey();
    var nowStr = toKSTString(new Date());
    if (!attendanceList[today]) attendanceList[today] = [];
    attendanceList[today].push({ sender: unifiedName, time: nowStr });
    var rank = attendanceList[today].length;
    if (!attendanceStats[unifiedName]) {
        attendanceStats[unifiedName] = { total: 1, ranks: [rank] };
    } else {
        attendanceStats[unifiedName].total++;
        attendanceStats[unifiedName].ranks.push(rank);
    }
    var earnedPoint = addRankPoints(unifiedName, rank);
    return { rank: rank, earned: earnedPoint, time: nowStr };
}

/***** 관리자: 특정 닉네임 데이터 전체 삭제 *****/
function deleteUserData(targetName, msg) {
    var deleted = false;
    var today = getTodayKey();
    var newList, i;
    if (chatCount[targetName] !== undefined) { delete chatCount[targetName]; deleted = true; }
    if (memberPoints[targetName] !== undefined) { delete memberPoints[targetName]; deleted = true; }
    if (attendanceStats[targetName] !== undefined) { delete attendanceStats[targetName]; deleted = true; }
    if (quizStats[targetName] !== undefined) { delete quizStats[targetName]; deleted = true; }
    if (attendanceList[today]) {
        newList = [];
        for (i = 0; i < attendanceList[today].length; i++) {
            if (getUnifiedSenderName(attendanceList[today][i].sender) !== targetName) {
                newList.push(attendanceList[today][i]);
            }
        }
        if (newList.length !== attendanceList[today].length) { attendanceList[today] = newList; deleted = true; }
    }
    if (deleted) {
        saveData();
        msg.reply("✅ [" + targetName + "] 님의 모든 데이터를 삭제했습니다.");
    } else {
        msg.reply("⚠️ [" + targetName + "] 님의 데이터가 없습니다.");
    }
}

/***** 관리자: 대리 출석 처리 *****/
function proxyAttendance(targetName, msg) {
    var res, medal;
    if (hasAttendedToday(targetName)) {
        msg.reply("[" + targetName + "] 님은 오늘 이미 출석하셨습니다.");
        return;
    }
    res = pushAttendance(targetName);
    medal = res.rank === 1 ? "🥇" : res.rank === 2 ? "🥈" : res.rank === 3 ? "🥉" : "";
    saveData();
    msg.reply(
        "✅ 관리자 대리 출석 처리 완료\n"
        + "[" + targetName + "] 님, " + res.rank + "등 출석 " + medal + "\n"
        + "적립 포인트: " + res.earned + "점"
    );
}

/***** 퀴즈 *****/
function seededRandomFactory(seed) {
    var m = 0x80000000, a = 1103515245, c = 12345;
    var state = seed % m;
    return function () {
        state = (a * state + c) % m;
        return state / m;
    };
}

function shuffleWithSeed(arr, seed) {
    var rnd = seededRandomFactory(seed);
    var i, j, tmp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(rnd() * (i + 1));
        tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
}

function ensureTodaysQuizOrder() {
    var today = getTodayKey();
    var parts, seed, indices, i, k;
    if (todaysQuizOrderDateKey === today && todaysQuizOrder && todaysQuizOrder.length) return;
    todaysQuizOrderDateKey = today;
    for (i = 0; i < QUIZ_BANK.length; i++) {
        if (typeof QUIZ_BANK[i]._qid !== "number") QUIZ_BANK[i]._qid = i;
    }
    parts = today.split(".");
    seed = parseInt(parts[0], 10) * 10000 + parseInt(parts[1], 10) * 100 + parseInt(parts[2], 10);
    indices = [];
    for (k = 0; k < QUIZ_BANK.length; k++) indices.push(k);
    todaysQuizOrder = shuffleWithSeed(indices, seed);
}

function startQuizRound(msg) {
    var remaining, i, idx, qid, pickIdx, pick, answers, normAnswers, j;
    if (!isQuizTime()) {
        msg.reply("⏰ 지금은 퀴즈 가능 시간이 아닙니다.\n[퀴즈 가능 시간] 매일 00:00 ~ 23:30");
        return false;
    }
    if (quizActive) {
        msg.reply("이미 퀴즈가 진행 중입니다. 정답은 '!정답 (내용)' 으로 제출하세요!");
        return false;
    }
    ensureTodaysQuizOrder();
    remaining = [];
    for (i = 0; i < todaysQuizOrder.length; i++) {
        idx = todaysQuizOrder[i];
        qid = (typeof QUIZ_BANK[idx]._qid === "number") ? QUIZ_BANK[idx]._qid : idx;
        if (!usedQuizIdsToday[qid]) remaining.push(idx);
    }
    if (remaining.length < 5) {
        msg.reply("📦 오늘 남은 문제 수가 5개 미만이라 퀴즈를 종료합니다.\n내일 다시 도전해 주세요!");
        return false;
    }
    pickIdx = remaining[Math.floor(Math.random() * remaining.length)];
    pick = QUIZ_BANK[pickIdx];
    answers = Array.isArray(pick.a) ? pick.a : [String(pick.a)];
    normAnswers = [];
    for (j = 0; j < answers.length; j++) normAnswers.push((answers[j] + "").replace(/^\s+|\s+$/g, ""));
    currentQuiz = {
        q: pick.q,
        a: normAnswers,
        hint: pick.hint || "힌트가 없습니다.",
        _qid: (typeof pick._qid === "number") ? pick._qid : pickIdx
    };
    quizActive = true;
    quizAnswered = {};
    usedQuizIdsToday[currentQuiz._qid] = true;
    msg.reply("🧩 퀴즈 시작!\nQ. " + currentQuiz.q + "\n\n[ !정답 (내용) | !힌트 | !종료 ]");
    return true;
}

function stopQuiz(msg, text) {
    quizActive = false;
    quizAnswered = null;
    currentQuiz = null;
    if (msg) msg.reply(text || "퀴즈가 종료되었습니다.");
}

function submitAnswer(unifiedName, payload, msg) {
    var ans, ok, i;
    function norm(s) { return (s + "").replace(/\s+/g, "").toLowerCase(); }
    if (!quizActive || !currentQuiz) { msg.reply("지금은 진행 중인 퀴즈가 없습니다. '!퀴즈'로 시작해보세요!"); return; }
    ans = (payload || "").replace(/^\s+|\s+$/g, "");
    if (!ans) { msg.reply("정답 형식: '!정답 (내용)'"); return; }
    if (quizAnswered && quizAnswered[unifiedName]) { msg.reply(unifiedName + " 님은 이미 이번 문제를 맞히셨습니다!"); return; }
    ok = false;
    for (i = 0; i < (currentQuiz.a || []).length; i++) {
        if (norm(ans) === norm(currentQuiz.a[i])) { ok = true; break; }
    }
    if (ok) {
        quizAnswered[unifiedName] = true;
        if (!quizStats[unifiedName]) quizStats[unifiedName] = { correct: 0 };
        quizStats[unifiedName].correct += 1;
        addQuizPointFixed(unifiedName);
        saveData();
        stopQuiz(msg, "🎉 정답! " + unifiedName + " 님\n(+5점 적립, 누적 정답 " + quizStats[unifiedName].correct + "회)");
    } else {
        msg.reply("❌ 오답! 다시 시도해보세요.");
    }
}

function giveHint(msg) {
    if (!quizActive || !currentQuiz) { msg.reply("지금은 진행 중인 퀴즈가 없습니다."); return; }
    msg.reply("💡 힌트: " + currentQuiz.hint);
}

function getQuizRankingRows() {
    var rows = [], name;
    for (name in quizStats) {
        if (quizStats.hasOwnProperty(name)) {
            rows.push({ name: name, correct: (quizStats[name] && quizStats[name].correct) ? quizStats[name].correct : 0 });
        }
    }
    rows.sort(function (a, b) {
        if (b.correct !== a.correct) return b.correct - a.correct;
        return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    });
    return rows;
}

function getQuizRankOf(name) {
    var rows = getQuizRankingRows(), i;
    for (i = 0; i < rows.length; i++) {
        if (rows[i].name === name) return i + 1;
    }
    return null;
}

/***** 메인 메시지 리스너 *****/
bot.addListener(Event.MESSAGE, function (msg) {
    var room = msg.room;
    var sender = msg.author.name;
    var content = msg.content;
    var isTargetRoom = (room === TARGET_ROOM);
    var isAdminDirect = (!msg.isGroupChat && sender === ADMIN_NAME);
    var unifiedName, res, res2, medal, medal2;
    var i, u1, u2, u3, u4;

    // ── 방 필터 ─────────────────────────────────────────────────────────
    // 대상 그룹채팅 또는 관리자 개인채팅만 처리
    if (!isTargetRoom && !isAdminDirect) return;
    // ────────────────────────────────────────────────────────────────────

    loadData();
    resetAttendanceIfNewDay();
    resetQuizIfNewDay();

    unifiedName = getUnifiedSenderName(sender);

    // 채팅 카운트/포인트: 대상 방에서만, 관리자 제외
    if (isTargetRoom && unifiedName !== ADMIN_NAME) {
        addChatCountAndStamp(unifiedName);
        addPoints(unifiedName, 1);
        saveData();
    }

    // ── 관리자 개인 채팅방 전용 명령 ──────────────────────────────────
    if (isAdminDirect) {
        // !삭제 (닉네임)
        if (content.indexOf("!삭제 ") === 0) {
            var delTarget = content.substring("!삭제 ".length).replace(/^\s+|\s+$/g, "");
            if (!delTarget) { msg.reply("사용법: !삭제 (닉네임)"); return; }
            deleteUserData(delTarget, msg);
            return;
        }
        // !출석 (닉네임) — 대리 출석
        if (content.indexOf("!출석 ") === 0) {
            var proxyTarget = content.substring("!출석 ".length).replace(/^\s+|\s+$/g, "");
            if (!proxyTarget) { msg.reply("사용법: !출석 (닉네임)"); return; }
            proxyAttendance(proxyTarget, msg);
            return;
        }
        if (content === "!!출석초기화") { attendanceList = {}; attendanceStats = {}; saveData(); msg.reply("✅ 출석 데이터를 초기화했어요."); return; }
        if (content === "!!채팅초기화") { chatCount = {}; saveData(); msg.reply("✅ 채팅 수 데이터를 초기화했어요."); return; }
        if (content === "!!포인트초기화") { memberPoints = {}; saveData(); msg.reply("✅ 포인트 데이터를 초기화했어요."); return; }
        if (content === "!!퀴즈초기화") { quizStats = {}; saveData(); msg.reply("✅ 퀴즈 통계를 초기화했어요."); return; }
        if (content === "!!운세초기화") { fortuneList = {}; saveData(); msg.reply("✅ 운세 데이터를 초기화했어요."); return; }
        if (content === "!!전체초기화") {
            attendanceList = {}; attendanceStats = {}; chatCount = {};
            memberPoints = {}; fortuneList = {}; quizStats = {};
            lastDate = getTodayKey();
            quizActive = false; currentQuiz = null; quizAnswered = null;
            saveData();
            msg.reply("✅ 전체 데이터를 초기화했어요.");
            return;
        }
        if (content === "!") {
            msg.reply(
                "📌 [코스방] 관리자 명령 안내\n"
                + "(타방과 동시사용을 막기 위하여 !! 로 사용해야 합니다)\n"
                + "!!삭제 (닉네임) – 해당 닉네임의 모든 데이터 삭제\n"
                + "!!출석 (닉네임) – 해당 닉네임 대리 출석 처리\n"
                + "!!출석초기화 – 출석 데이터 초기화\n"
                + "!!채팅초기화 – 채팅수 데이터 초기화\n"
                + "!!포인트초기화 – 포인트 데이터 초기화\n"
                + "!!퀴즈초기화 – 퀴즈 통계 초기화\n"
                + "!!운세초기화 – 운세 데이터 초기화\n"
                + "!!전체초기화 – 모든 데이터 초기화"
            );
            return;
        }
        // 그 외 개인채팅 메시지 무시
        return;
    }

    // ── 이하 TARGET_ROOM 일반 응답 ───────────────────────────────────

    // === (A) 퀴즈 진행 중 명령 차단 (최우선) ===
    if (quizActive) {
        if (content.indexOf("!") === 0) {
            if (content.indexOf("!정답") === 0) { submitAnswer(unifiedName, content.replace(/^!정답\s*/, ""), msg); return; }
            if (content === "!힌트") { giveHint(msg); return; }
            if (content === "!종료") { stopQuiz(msg, "🛑 퀴즈를 종료했습니다."); return; }
            msg.reply("⛔️퀴즈모드가 켜졌습니다.\n다른 명령어는 모두 차단됩니다.🚧");
            return;
        }
    }

    // === (B) !출석 (강제 출석) ===
    if (content === "!출석") {
        if (!isAttendanceTime()) { msg.reply("⏰ 출석 가능 시간이 아닙니다.\n\n[출석 가능 시간]\n(월~금) 07:00~12:00\n(토~일) 06:00~13:00"); return; }
        if (unifiedName === ADMIN_NAME) { msg.reply("관리자는 출석 집계에서 제외됩니다."); return; }
        if (!hasAttendedToday(unifiedName)) {
            res = pushAttendance(unifiedName);
            medal2 = res.rank === 1 ? "🥇" : res.rank === 2 ? "🥈" : res.rank === 3 ? "🥉" : "";
            saveData();
            msg.reply(
                unifiedName + " 님, " + res.rank + "등으로 출석 완료했어요! " + medal2 + " 🎉\n"
                + "이번 출석으로 " + res.earned + "점 적립했어요.\n\n"
                + "⚠️경고⚠️\n"
                + "오늘 " + unifiedName + " 님은 강제출석명령을 사용하셔서 출석하셨습니다.\n"
                + "자동 출석을 우선으로 사용하여야 하며\n자동 출석이 되지 않아 강제출석이 불가피하였을 경우 반드시 방장에게 말씀해주셔야 합니다."
            );
        } else {
            msg.reply(unifiedName + " 님은 이미 출석하셨어요. 😊\n\n[출석 가능 시간]\n(월~금) 07:00~12:00\n(토~일) 06:00~13:00");
        }
        return;
    }

    // === (C) 자동 출석 ===
    if (isAttendanceTime() && unifiedName !== ADMIN_NAME) {
        if (!hasAttendedToday(unifiedName)) {
            res2 = pushAttendance(unifiedName);
            medal = res2.rank === 1 ? "🥇" : res2.rank === 2 ? "🥈" : res2.rank === 3 ? "🥉" : "";
            saveData();
            msg.reply(unifiedName + " 님, " + res2.rank + "등으로 출석 완료했어요! " + medal + " 🎉\n이번 출석으로 " + res2.earned + "점 적립했어요.");
        }
    }

    // === (D) 출석 조회 ===
    if (content === "!출석랭킹") {
        var todayKey = getTodayKey();
        if (attendanceList[todayKey] && attendanceList[todayKey].length > 0) {
            var rankList = "";
            for (i = 0; i < attendanceList[todayKey].length; i++) {
                var medalRL = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
                rankList += (i + 1) + "등: " + getUnifiedSenderName(attendanceList[todayKey][i].sender) + " " + medalRL + "\n";
            }
            msg.reply("📋 오늘의 아침출석 랭킹\n" + rankList + "랭킹에 계신 분들 모두 축하합니다!");
        } else {
            msg.reply("아직 아무도 출석하지 않았어요. 😢\n다들 자고있나...?");
        }
        return;
    }

    if (content === "!출석통계") {
        var statKeys = [];
        var uk;
        for (uk in attendanceStats) { if (attendanceStats.hasOwnProperty(uk)) statKeys.push(uk); }
        if (statKeys.length === 0) { msg.reply("아직 출석한 사용자가 없습니다. 😢"); return; }
        statKeys.sort(function (a, b) {
            var t1 = (attendanceStats[a] && attendanceStats[a].total) ? attendanceStats[a].total : 0;
            var t2 = (attendanceStats[b] && attendanceStats[b].total) ? attendanceStats[b].total : 0;
            if (t1 !== t2) return t2 - t1;
            var r1 = (attendanceStats[a] && attendanceStats[a].ranks) ? attendanceStats[a].ranks : [];
            var r2 = (attendanceStats[b] && attendanceStats[b].ranks) ? attendanceStats[b].ranks : [];
            var s1 = 0, s2 = 0, xi, yi;
            for (xi = 0; xi < r1.length; xi++) s1 += r1[xi];
            for (yi = 0; yi < r2.length; yi++) s2 += r2[yi];
            return (r1.length ? s1 / r1.length : Infinity) - (r2.length ? s2 / r2.length : Infinity);
        });
        var statOut = "📊 전체 출석 통계\n";
        for (i = 0; i < statKeys.length; i++) {
            var sname = statKeys[i];
            var sdata = attendanceStats[sname];
            var srks = sdata.ranks ? sdata.ranks : [];
            var ssum = 0, si;
            for (si = 0; si < srks.length; si++) ssum += srks[si];
            var savg = srks.length ? (ssum / srks.length).toFixed(2) : "N/A";
            statOut += "- " + sname + ": " + sdata.total + "일 출석 | 평균 등수 " + savg + "\n";
        }
        msg.reply(statOut + "상위권에 계신 분들 모두 축하합니다!");
        return;
    }

    // === (E) 내정보 / 남정보 ===
    if (content === "!나") {
        ensureChatRecord(unifiedName);
        var myCount = chatCount[unifiedName].count || 0;
        var myLast = chatCount[unifiedName].lastChatAt || "기록 없음";
        var myAttend = (attendanceStats[unifiedName] && attendanceStats[unifiedName].total) ? attendanceStats[unifiedName].total : 0;
        var myPoint = memberPoints[unifiedName] || 0;
        var myAvg = "N/A";
        var myQRank = getQuizRankOf(unifiedName);
        if (attendanceStats[unifiedName] && attendanceStats[unifiedName].ranks && attendanceStats[unifiedName].ranks.length > 0) {
            var myrks = attendanceStats[unifiedName].ranks, mysum = 0, mi;
            for (mi = 0; mi < myrks.length; mi++) mysum += myrks[mi];
            myAvg = (mysum / myrks.length).toFixed(2);
        }
        var myCorrect = (quizStats[unifiedName] && quizStats[unifiedName].correct) ? quizStats[unifiedName].correct : 0;
        msg.reply(
            "나의 정보[" + unifiedName + "]\n"
            + "점수 " + myPoint + "점 | 채팅수 " + myCount + "개\n"
            + "출석 " + myAttend + "일 | 평균 " + myAvg + "위\n"
            + "퀴즈 정답 " + myCorrect + "회 | 퀴즈 랭킹 " + (myQRank ? myQRank + "위" : "기록 없음") + "\n"
            + "마지막 채팅일시 " + myLast
        );
        return;
    }

    if (content.indexOf("!남 ") === 0) {
        var rawTarget = content.substring("!남 ".length).replace(/^\s+|\s+$/g, "");
        var targetName = getUnifiedSenderName(rawTarget);
        if (!targetName) { msg.reply("대상 닉네임을 입력해주세요. 예) !남 코알"); return; }
        var hasAny = chatCount[targetName] != null || memberPoints[targetName] != null
            || attendanceStats[targetName] != null || quizStats[targetName] != null;
        if (!hasAny) { msg.reply(targetName + " 님의 기록이 없어요."); return; }
        ensureChatRecord(targetName);
        var tCount = (chatCount[targetName] && chatCount[targetName].count) ? chatCount[targetName].count : 0;
        var tLast = (chatCount[targetName] && chatCount[targetName].lastChatAt) ? chatCount[targetName].lastChatAt : "기록 없음";
        var tAttend = (attendanceStats[targetName] && attendanceStats[targetName].total) ? attendanceStats[targetName].total : 0;
        var tPoint = memberPoints[targetName] || 0;
        var tAvg = "N/A";
        if (attendanceStats[targetName] && attendanceStats[targetName].ranks && attendanceStats[targetName].ranks.length > 0) {
            var trks = attendanceStats[targetName].ranks, tsum = 0, ti;
            for (ti = 0; ti < trks.length; ti++) tsum += trks[ti];
            tAvg = (tsum / trks.length).toFixed(2);
        }
        var tCorrect = (quizStats[targetName] && quizStats[targetName].correct) ? quizStats[targetName].correct : 0;
        var tRank = getQuizRankOf(targetName);
        msg.reply(
            targetName + " 님의 정보\n"
            + "점수 " + tPoint + "점 | 채팅수 " + tCount + "개\n"
            + "출석 " + tAttend + "일 | 평균 " + tAvg + "위\n"
            + "퀴즈 정답 " + tCorrect + "회 | 퀴즈 랭킹 " + (tRank ? tRank + "위" : "기록 없음") + "\n"
            + "마지막 채팅일시 " + tLast
        );
        return;
    }

    // === (F) 멤버통계 ===
    if (content === "!멤버통계") {
        var memberSet = {};
        for (u1 in memberPoints) { if (memberPoints.hasOwnProperty(u1)) memberSet[u1] = true; }
        for (u2 in chatCount) { if (chatCount.hasOwnProperty(u2)) memberSet[u2] = true; }
        for (u3 in attendanceStats) { if (attendanceStats.hasOwnProperty(u3)) memberSet[u3] = true; }
        for (u4 in quizStats) { if (quizStats.hasOwnProperty(u4)) memberSet[u4] = true; }
        var rows = [], mname;
        for (mname in memberSet) {
            if (!memberSet.hasOwnProperty(mname) || mname === ADMIN_NAME) continue;
            ensureChatRecord(mname);
            rows.push({
                name: mname,
                point: memberPoints[mname] || 0,
                chat: (chatCount[mname] && chatCount[mname].count) ? chatCount[mname].count : 0,
                attend: (attendanceStats[mname] && attendanceStats[mname].total) ? attendanceStats[mname].total : 0,
                last: (chatCount[mname] && chatCount[mname].lastChatAt) ? chatCount[mname].lastChatAt : "기록 없음",
                qcorrect: (quizStats[mname] && quizStats[mname].correct) ? quizStats[mname].correct : 0
            });
        }
        if (rows.length === 0) { msg.reply("아직 멤버 통계를 표시할 데이터가 없어요. 😢"); return; }
        rows.sort(function (x, y) { return y.point !== x.point ? y.point - x.point : y.chat - x.chat; });
        var mout = "📈 멤버 통계\n";
        for (i = 0; i < rows.length; i++) {
            var rMedal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
            mout += "———————————————\n" + rows[i].name + (rMedal ? " " + rMedal : "") + "\n"
                + "점수 " + rows[i].point + "점 | 채팅수 " + rows[i].chat + "개\n"
                + rows[i].attend + "일 출석 | 퀴즈정답 " + rows[i].qcorrect + "회\n"
                + "마지막 채팅일시 " + rows[i].last + (i < rows.length - 1 ? "\n" : "");
        }
        msg.reply(mout);
        return;
    }

    // === (G) 기타 ===
    if (content === "!명언") { msg.reply(quotes[Math.floor(Math.random() * quotes.length)]); return; }

    if (content === "!밥" || content === "밥" || content === "점메추" || content === "저메추" || content === "메뉴추천") {
        msg.reply(unifiedName + " 님,\n오늘은 '" + foodList[Math.floor(Math.random() * foodList.length)] + "' 어떠세요? 🍽️");
        return;
    }

    if (content === "!디저트" || content === "디저트" || content === "후식" || content === "후식추천") {
        msg.reply(unifiedName + " 님,\n디저트는 '" + dessertList[Math.floor(Math.random() * dessertList.length)] + "' 추천드려요! 🍰");
        return;
    }

    if (content === "!운세") {
        var tday = getTodayKey();
        if (typeof fortuneList !== "object" || fortuneList === null) fortuneList = {};
        if (!fortuneList[tday]) fortuneList[tday] = {};
        if (!fortuneList[tday][unifiedName]) {
            fortuneList[tday][unifiedName] = fortunes[Math.floor(Math.random() * fortunes.length)];
            saveData();
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
            unifiedName + " 님의 오늘의 운세입니다. 🔮\n\n"
            + fortuneList[tday][unifiedName]
            + "\n\n🎲로또 추천 번호: " + nums.join(", ")
            + "\n주의사항: 해당 기능은 당첨여부를 보장하지 않습니다."
        );
        return;
    }

    // === (H) 퀴즈 ===
    if (content === "!퀴즈") { startQuizRound(msg); return; }
    if (content === "!힌트") { giveHint(msg); return; }
    if (content.indexOf("!정답") === 0) { submitAnswer(unifiedName, content.replace(/^!정답\s*/, ""), msg); return; }
    if (content === "!종료" && sender === ADMIN_NAME) { stopQuiz(msg, "🛑 관리자가 퀴즈를 종료했습니다."); return; }

    if (content === "!퀴즈랭킹") {
        var qrows = getQuizRankingRows(), qtotal = 0, qtext = "🏆 퀴즈 랭킹 (누적 정답 수)\n", qi, qmedal;
        if (qrows.length === 0) { msg.reply("아직 퀴즈 정답 기록이 없습니다."); return; }
        for (qi = 0; qi < qrows.length; qi++) {
            qmedal = qi === 0 ? "🥇" : qi === 1 ? "🥈" : qi === 2 ? "🥉" : "";
            qtext += (qi + 1) + "위 " + qrows[qi].name + " " + qmedal + " - " + qrows[qi].correct + "회\n";
            qtotal += qrows[qi].correct;
        }
        msg.reply(qtext + "\n📦 전체 퀴즈 맞춘 횟수(총합): " + qtotal + "회");
        return;
    }

    // === (I) 고정 멘트 ===
    if (content.indexOf("반가워요! 이왕") === 0) { msg.reply("안녕하세요! 공지 읽고, 오픈프로필로 바꿔주세요!\n우리 잘 지내봐요 😊"); return; }
    if (content.indexOf("보이스룸이 방금") === 0) { msg.reply("보이스룸이 시작되었어요! 이번에는 어떤 이야기들이 오갈까요?!"); return; }
    if (content.indexOf("보이스룸 종료") === 0) { msg.reply("보이스룸이 종료되었습니다. 모두 수고하셨습니다!"); return; }
    if (content.indexOf("안녕하세요") === 0) { msg.reply("반가워요! 🙌"); return; }
    if (content === "!안녕" || content === "!안녕하세요" || content === "/억지응답") {
        msg.reply("(왜인지는 모르겠지만 이 메시지에 응답을 해야할 것 같다는 느낌이 든다)"); return;
    }
    if (content === "!생존확인" || content === "!생존신고" || content === "JAVA_HOME") {
        msg.reply("이 메시지가 전송된다면 살아있다는 것 입니다."); return;
    }
    if (content.indexOf("어? 저기 심심한 사람이 있나봐요!") === 0) { msg.reply("여기, 이한봇이 있어요!\n심심하시면 이한봇을 사용해 보는 것은 어떨까요?\n!만 입력 후 전송하시면 사용방법 나옵니다!"); return; }

    if (content === "!") {
        msg.reply(
            "📌 이한봇 기능안내 💬\n"
            + "출석 기능 안내\n"
            + " • 아침에 채팅치면 자동으로 출석!🎉\n"
            + " • !출석랭킹 – 오늘 출석 목록 📋\n"
            + " • !출석통계 – 누적 출석 통계 📊\n\n"
            + "나와 멤버 정보보기\n"
            + " • !나 – 내 정보 확인하기🧑‍💻\n"
            + " • !남 (닉네임) – 남의 정보 확인하기👤\n"
            + " • !멤버통계 – 멤버 종합 통계(점수 순) 📈\n\n"
            + "추천 및 운세\n"
            + " • !밥 / !디저트: 음식 추천 제공 🍲🍨\n"
            + " • !명언 / !운세: 명언 또는 운세 보기👀\n\n"
            + "넌센스 퀴즈 기능\n"
            + " • !퀴즈 – 넌센스 퀴즈를 맞춰보세요!\n"
            + " • !퀴즈랭킹 – 가장 많이 퀴즈를 맞힌 사람은 누구일까요?\n\n"
            + "문제 발생 시 관리자에게 문의 부탁드립니다. (Version 4.0)"
        );
        return;
    }

    if (content === "!주의사항") {
        msg.reply(
            "⚠️주의사항⚠️\n"
            + "1. 채팅봇은 원활한 구동을 보장하지 않습니다.\n"
            + "2. 고정 이모지/닉네임 기반으로 동작하니, 닉변이 잦다면 고정이모지 설정을 요청해주세요.\n"
            + "3. 채팅/출석 등 기록형 기능은 관련 법률에 따라 주기적으로 초기화되며, 최대 1년 보존 후 삭제될 수 있습니다.\n"
            + "4. 주기적 점검으로 잠시 기능이 중단될 수 있습니다.\n"
            + "5. 로또 번호는 당첨을 보장하지 않습니다.\n"
            + "6. 사진/이모티콘은 인식하지 않을 수 있습니다.\n"
            + "7. 해당 봇은 AI가 아닙니다. 정확한 답변을 요구하지 마십시오."
        );
        return;
    }

    if (content === "!브리핑") {
        msg.reply(
            "매일 아침에 제공되는 AI기반 브리핑 서비스 입니다.\n"
            + "❗️참고사항❗️\n"
            + " ▪︎ 기상상황은 예측에서 벗어날 수 있습니다.\n"
            + " ▪︎ 기상관측위치 기준은 각 시•도청 혹은 전지역 기온/날씨의 평균입니다.\n"
            + "(단, 경기북부는 의정부에 위치한 경기도청북부청사 기준이며, 경기남부는 수원에 위치한 경기도청 기준)\n"
            + " ▪︎ 해당 브리핑에는 다음 모델을 사용했습니다\n"
            + "Apple Intelligence(온디바이스/비공개 클라우드), ChatGPT 5.3\n"
            + " ▪︎ AI가 반환한 정보에는 잘못된 정보가 있을 수 있습니다.\n"
            + " ▪︎ 특정 방/사용자의 공식 입장이 아닙니다."
        );
        return;
    }

    if (content === "!결석" || content === "!석출" || content === "석출" || content === "!노잼") {
        msg.reply("재미없어요 😑"); return;
    }

    // === 확률성 응답 ===
    if (Math.random() < 0.5) {
        if (content === "ㅋ") { msg.reply("ㅋ"); return; }
        if (content === "ㅎ") { msg.reply("ㅎ"); return; }
    }
});

/***** 액티비티 이벤트 *****/
bot.addListener(Event.ACTIVITY_CREATE, function (activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
});
bot.addListener(Event.ACTIVITY_START, function () { });
bot.addListener(Event.ACTIVITY_RESUME, function () { });
bot.addListener(Event.ACTIVITY_PAUSE, function () { });
bot.addListener(Event.ACTIVITY_STOP, function () { });