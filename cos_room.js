/*
 * 코스어가 되어버려 채팅방 전용 봇
 * Version 5.1
 */

var bot = BotManager.getCurrentBot();

// 
//  상수
// 
var TARGET_ROOM = "코스어가 되어버려✨";
var ADMIN_NAME = "권재현";

var FILE_USER_MAP = "user_map.txt";
var FILE_USER_DATA = "user_data.txt";
var FILE_ATTENDANCE = "attendance_today.txt";
var FILE_FORTUNE = "fortune_today.txt";

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
    { q: "[005] [넌센스] '비가 1시간 동안 내린다'를 다른말로 뭐라고 할까? (붙여서 쓸 것)", a: ["추적60분"], hint: "방송 프로그램 이름입니다." },
    { q: "[006] [IT] 계산하다(Compute)에서 유래된 단어로, 과거에는 '계산하는 사람'을 칭하는 말이었다. 지금은 자동화된 이 기기도 이 단어로 칭하는데, 이 단어는 무엇인가?", a: ["컴퓨터", "Computer"], hint: "🧑‍💻" },
    { q: "[007] [넌센스] 세상에서 제일 예쁜 풀은?", a: ["뷰티풀"], hint: "남자들이 이걸로 드립치죠. 얼굴에 풀 묻었다고." },
    { q: "[008] [넌센스] 화상입고 하는 전화는?", a: ["화상전화"], hint: "얼굴을 보고 전화를 하는걸 이거라고 하죠." },
    { q: "[009] [넌센스] D가 20개씩 있으면 뭘까?", a: ["스무디"], hint: "언 과일과 얼음을 갈아서 먹는 베버리지입니다." },
    { q: "[010] [넌센스] 소가 불에 타면?", a: ["불소"], hint: "치아에 이걸 코팅하면 충치를 예방할 수 있다고 알려져 있습니다." },
    { q: "[011] [넌센스] 호주에서 쓰는 돈은?", a: ["호주머니"], hint: "호주달러는 아닙니다. 호주가 들어가는건 맞아요." },
    { q: "[012] [넌센스] USA 다음은?", a: ["USB"], hint: "범용직렬버스라고 불리우는 것입니다." },
    { q: "[013] [넌센스] '성씨가 똑같다'를 3글자로 줄이면?", a: ["성동일"], hint: "유명인 이름입니다." },
    { q: "[014] [넌센스] 혀가 거짓말할 때 쓰는 말은? (붙여서 쓸 것, 기호는 쓰지말것)", a: ["전혀아닙니다"], hint: "극구 부정할 때 쓰는 말이기도 합니다." },
    { q: "[015] [넌센스] 슈퍼주니어 신동 옆에 있으면 뭐라고 할까? (3글자)", a: ["신동엽"], hint: "SNL에 자주 나오는 유명인 이름입니다." },
    { q: "[016] [넌센스] 과자가 자기소개하면? (3글자)", a: ["전과자"], hint: "범죄를 저지른 이력이 있는 사람" },
    { q: "[017] [넌센스] 소가 공포에 떨면?", a: ["소름", "소오름"], hint: "진짜 __돋네요." },
    { q: "[018] [넌센스] 입모양이 S자인 사람을 뭐라고 할까? (영어 대문자, 3음절)", a: ["EBS", "이비에스"], hint: "한국교육방송공사의 영어 약어입니다." },
    { q: "[019] [넌센스] 달에서 쓰는 언어는?", a: ["문어"], hint: "달은 영어로 Moon, 그리고 한자로 語를 붙여보세요." },
    { q: "[020] [IT] macOS 에서는 ctrl(Control) 키를 거의 사용하지 않는데, 그렇다면 ctrl 키 대신 어떤 키를 사용하나?\n보기에서 골라쓰시오.\n\n[보기] Command | Alternative Key (Alt) | Function Key (Fn) | Escape Key (ESC)", a: ["Command", "커멘드", "코멘드"], hint: "Command + C 는 복사입니다." },
    { q: "[021] [넌센스] 양이 돈을 벌어서 내는 세금은 뭘까? (5글자)", a: ["양도소득세"], hint: "재화를 양도할 때 내는 세금입니다." },
    { q: "[022] [넌센스] 할아버지가 등산하면?", a: ["산타할아버지"], hint: "호호호" },
    { q: "[023] [넌센스] '할아버지! 산에서 불이나요!'를 6글자로 줄이면?", a: ["산타할아버지"], hint: "호호호" },
    { q: "[024] [넌센스] 쟤는 포도다! 를 3글자로 줄이면?", a: ["포도당"], hint: "당 중의 하나입니다." },
    { q: "[025] [넌센스] 햄버거의 색깔은?", a: ["버건디"], hint: "색깔 이름입니다." },
    { q: "[026] [넌센스] 소가 그림을 그리면?", a: ["피카소"], hint: "소로 끝나는 유명 화가 이름입니다." },
    { q: "[027] [넌센스] 소는 어디에서 쉴까?", a: ["휴게소"], hint: "일반적으로 고속도로에 있어요." },
    { q: "[028] [넌센스] 물이 총을 들고 있으면?", a: ["물건"], hint: "물총, 워터건 다 아닙니다. 물은 맞는데 총을 영어로 생각해보셔요." },
    { q: "[029] [넌센스] 세상에서 가장 쉬운 숫자는? (답 입력시 숫자만 입력)", a: ["190000"], hint: "아라비아숫자로 입력하세요." },
    { q: "[030] [넌센스] 트가 아프면 아파트, 근데 트는 어디가 아플까?", a: ["배란다", "베란다"], hint: "아래층의 지붕 공간을 활용해 건물 외부에 돌출된 옥외 공간으로, 통상 1층 면적이 2층보다 클 때 2층에 생기는 바닥(루프 테라스)을 의미합니다." },
    { q: "[031] [넌센스] 로봇이 좋아하는 치킨 부위는?", a: ["윙"], hint: "로봇은 윙~ 치킨~ 하고 움직이죠." },
    { q: "[032] [IT] EMV Contactless 기반의 비접촉 결제 시스템으로, Apple에서 서비스 하고 있는 결제 서비스는 무엇인가?", a: ["애플페이", "Apple Pay"], hint: "Apple 지갑 앱에서 결제할 수 있는 서비스입니다." },
    { q: "[033] [IT] UNIX 기반의 휴대전화용 OS로서, Apple社의 iPhone에 탑재된 OS의 이름은 무엇인가?", a: ["iOS", "아이오에스", "iPhoneOS"], hint: "옛 이름은 iPhone OS 입니다." },
    { q: "[034] [IT] Linux 기반의 오픈소스 휴대전화용 OS로서, 현재는 Google이 인수하여 서비스하고 있는 OS의 이름은 무엇인가?", a: ["Android", "안드로이드"], hint: "삼성 갤럭시에 탑재된 모바일 기기 운영체제 이름입니다." },
    { q: "[035] [헌터X헌터] 키르아 조르딕이 속한 가문은 대대로 어떤 직업을 가업으로 삼고 있나?", a: ["암살자", "암살"], hint: "가족 구성원 전원이 초일류 실력을 갖춘 집단입니다." },
    { q: "[036] [헌터X헌터] 주인공 '곤 프릭스'의 고향인 섬의 이름?", a: ["고래섬", "쿠지라지마"], hint: "곤이 미토 이모와 함께 자란 곳으로, 낚시하기 좋은 자연환경을 가지고 있습니다." },
    { q: "[037] [헌터X헌터] 곤 프릭스의 아버지이자 전설적인 헌터인 이 사람의 이름은?", a: ["진 프릭스", "진"], hint: "그리드 아일랜드의 제작자 중 한 명이며 전 십이지 멤버입니다." },
    { q: "[038] [헌터X헌터] 넨의 계통을 판별하기 위해 물이 든 컵에 잎사귀를 띄우고 수행하는 의식은?", a: ["수견식", "미즈미루시키"], hint: "물의 변화(맛, 불순물, 양 등)를 통해 자신의 계통을 확인합니다." },
    { q: "[039] [헌터X헌터] 키르아가 가출할 때 찔렀던 인물이자 조르딕 가문의 차남인 인물은?", a: ["미르키 조르딕", "미르키"], hint: "컴퓨터 해킹과 피규어 수집이 취미인 통통한 체형의 인물입니다." },
    { q: "[040] [국어] '수도' (Capital City)를 뜻하는 다른 말로, 대한민국의 수도 지명이기도 한 이 단어는 무엇인가?", a: ["서울", "서울특별시", "서울시"], hint: "예문: 미국의 서울은 워싱턴DC입니다." },
    { q: "[041] [헌터X헌터] 크라피카의 눈이 붉게 변했을 때 발동되는 특질계 능력의 명칭은?", a: ["엠퍼러 타임", "절대 시간", "제타이지칸"], hint: "모든 계통의 능력을 100% 효율로 사용할 수 있게 해주는 능력입니다." },
    { q: "[042] [헌터X헌터] 곤과 진이 만든 헌터 전용 게임의 타이틀 이름은?", a: ["그리드 아일랜드", "GI"], hint: "현실 세계의 특정 섬에서 실행되는 실사 게임입니다." },
    { q: "[043] [헌터X헌터] 환영여단의 단장이자 타인의 능력을 훔치는 능력을 가진 인물은?", a: ["클로로 루실후르", "클로로"], hint: "'도적의 극의(스킬 헌터)'라는 책을 매개체로 사용합니다." },
    { q: "[044] [헌터X헌터] 개미 편에서 왕(메르엠)과 '군의'를 두며 교감을 나누었던 눈 먼 소녀의 이름은?", a: ["코무기"], hint: "군의의 세계 챔피언이며, 왕이 죽음의 순간까지 찾았던 인물입니다." },
    { q: "[045] [헌터X헌터] 넨의 응용 기술 중 하나로, 몸 주위에 오라를 둘러 방어력을 높이는 기술은?", a: ["켄"], hint: "'전'과 '연'을 복합적으로 사용하여 전신을 보호하는 상태입니다." },
    { q: "[046] [헌터X헌터] 제287기 헌터 시험에서 곤이 달았던 수험 번호는?", a: ["405", "405번"], hint: "키르아는 99번, 크라피카는 404번이었습니다." },
    { q: "[047] [헌터X헌터] 조르딕 가문의 집사 중 한 명으로, 동전을 총탄처럼 튕겨 공격하는 인물은?", a: ["고토", "고트"], hint: "키르아를 매우 아끼며, 히소카와의 전투에서 활약했습니다." },
    { q: "[048] [헌터X헌터] 전 헌터 협회 회장 아이작 네테로의 최강 기술로, 거대한 관음상을 소환하는 능력은?", a: ["백식관음", "햐쿠시키칸논"], hint: "메르엠과의 전투에서 사용했으며, 기술을 쓸 때마다 감사의 기도를 올립니다." },
    { q: "[049] [헌터X헌터] 키르아가 넨을 전기로 변화시켜 자신의 신체 능력을 한계까지 끌어올리는 기술의 명칭은?", a: ["신속", "칸무루"], hint: "'전광석화'와 '질풍신뢰'라는 두 가지 파생 기술이 있습니다." },
    { q: "[050] [헌터X헌터] 넨의 4대 행 중 하나로, 몸 밖으로 흐르는 오라를 신체 내부에 머물게 하여 생기를 유지하는 기술은?", a: ["전", "텐"], hint: "방어의 기본이며 이를 익히면 노화를 늦추는 효과도 있습니다." },
    { q: "[051] [헌터X헌터] 환영여단의 멤버 페이탄이 사용하는 능력으로, 받은 데미지를 열에너지로 바꿔 방출하는 기술은?", a: ["라이징 선", "태양에 불타라", "라이징선", "라이싱선"], hint: "자이잔(사잔)과의 전투에서 사용해 강력한 광범위 공격을 퍼부었습니다." },
    { q: "[052] [헌터X헌터] 카이토가 사용하는 넨 능력으로, 1~9번까지의 숫자 중 무작위로 무기가 나오는 능력은?", a: ["크레이지 슬롯", "미친 피에로", "크레이지슬롯"], hint: "무기가 나올 때마다 피에로가 입담을 늘어놓으며, 본인은 '꽝'이라며 불평하곤 합니다." },
    { q: "[053] [헌터X헌터] 그리드 아일랜드 편의 최종 보스로, '폭탄마(보머)'라고 불리는 이 인물의 이름은?", a: ["겐스루"], hint: "손으로 만진 곳에 폭탄을 설치하는 '리틀 플라워' 능력을 사용합니다." },
    { q: "[054] [헌터X헌터] 환영여단의 시즈쿠가 사용하는 청소기 형태의 넨 능력 명칭은?", a: ["데메찬", "버큐엄", "데메쨩"], hint: "살아있는 것 외에는 무엇이든 빨아들이며 증거 인멸과 운반을 담당합니다." },
    { q: "[055] [헌터X헌터] 십이지의 멤버이자 전 부회장으로, 진 프릭스와 대립하는 교활한 성격의 인물은?", a: ["패리스톤 힐", "패리스톤"], hint: "항상 웃는 얼굴이지만 속을 알 수 없으며 네테로 회장이 가장 다루기 힘들어했던 인물입니다." },
    { q: "[056] [헌터X헌터] 암흑 대륙에서 온 '가스 생명체'이자, 아르카 조르딕의 안에 깃들어 있는 존재의 이름은?", a: ["나니카", "아이"], hint: "키르아만이 이 존재의 '부탁' 없이 명령을 내릴 수 있습니다." },
    { q: "[057] [헌터X헌터] 너클 바인이 사용하는 능력으로, 상대에게 오라를 빌려주고 파산시키는 기술의 이름은?", a: ["하코와레", "천상부지 유아독존", "텐죠시라누이 유이가도쿠손"], hint: "작은 마스코트 '포트클린'이 따라다니며 카운트를 셉니다." },
    { q: "[058] [헌터X헌터] 환영여단의 마치 가 사용하는 넨 능력을 이용한 실의 명칭은?", a: ["넨사", "넨 실"], hint: "부러진 팔을 접합하거나 적을 구속하는 등 다용도로 활용되는 오라의 실입니다." },
    { q: "[059] [헌터X헌터] 환영여단의 멤버 중 '행운의 이름표'를 이용해 타인을 조종하는 조작계 능력자는?", a: ["샤르나크"], hint: "여단의 브레인 중 한 명이며, 휴대전화를 매개체로 능력을 발동합니다." },
    { q: "[060] [헌터X헌터] 키메라 앤트 편에서 네테로 회장과 함께 궁전에 침입한 인물로, 연기를 조종하는 능력을 가진 헌터는?", a: ["모라우", "모라우 맥카나시"], hint: "거대한 파이프를 무기로 사용하며 '딥 퍼플'이라는 기술을 구사합니다." },
    { q: "[061] [IT] 웹사이트에서 페이지를 찾을 수 없을 때 뜨는 오류 코드로, KiiKii(키키)가 해당 노래로 큰 이슈를 끈 바 있다. 400번대 오류코드인데, 정확한 코드는 몇 번인가? (400~404 중 하나 선택)", a: ["404", "404번"], hint: "객관식은 힌트를 제공하지 않아요." },
    { q: "[062] [헌터X헌터] 키메라 앤트 왕의 직속 호위군 중 한 명으로, 거대한 고양이 귀를 가진 특질계 능력자는?", a: ["네페르피트", "피트"], hint: "닥터 브라이스라는 인형을 소환해 수술이나 수복을 할 수 있습니다." },
    { q: "[063] [헌터X헌터] 넨의 응용 기술 중, 오라를 눈에 집중시켜 보이지 않는 넨을 간파하는 기술은?", a: ["교"], hint: "히소카의 '깜짝 텍스처'나 '번지껌'을 간파하기 위해 필수적인 기술입니다." },
    { q: "[064] [IT] Compact Disk 의 약자로서, 원판에 레이저로 정보를 저장하고 읽는 매체를 무엇이라고 하는가?", a: ["CD", "씨디"], hint: "이 매체에다가 기록하는 행위를 '버닝' (굽기) 라고 합니다. 사실 Compact Disk의 이니셜을 쓰면 그게 정답입니다." },
    { q: "[065] [헌터X헌터] 환영여단 멤버 우보긴을 죽음으로 몰고 간 크라피카의 사슬 기술 명칭은?", a: ["자박하는 중지의 쇠사슬", "체인 제일"], hint: "여단 멤버에게만 사용한다는 제약을 걸어 강도를 극한으로 높인 기술입니다." },
    { q: "[066] [헌터X헌터] 헌터 시험 제4차 시험지였던 섬의 이름은?", a: ["제빌섬"], hint: "번호표 빼앗기 서바이벌이 진행되었으며, 곤이 히소카의 번호표를 낚아챘던 장소입니다." },
    { q: "[067] [헌터X헌터] 곤과 키르아의 스승이자, 본모습은 거구의 근육질 여성이지만 소녀의 모습을 하고 있는 인물은?", a: ["비스켓 크루거", "비스케"], hint: "그리드 아일랜드에서 두 사람에게 넨의 기초와 응용을 가르쳤습니다." },
    { q: "[068] [IT X 수학] [난이도 최상] 16진수 F 는 10진수로 몇인가?", a: ["15", "십오"], hint: "16진수로 E는 10진수로 14 입니다." },
    { q: "[069] [IT] 보조기억장치의 종류 중 하나로, 여러 겹의 딱딱한 원판(Disk)에 자석 신호로 정보를 저장하는 매체는 무엇인가?", a: ["하드디스크드라이브", "HDD", "하드", "하드디스크"], hint: "딱딱한 (Hard) 원판(Disk) 저장매체(Drive)" },
    { q: "[070] [IT] 이한봇이 사용하고 있는 스크립트 언어로, 이 언어는 무엇인가? 보기에서 골라 답하시오.\n\n[보기] JavaScript | Java | Python", a: ["JS", "자바스크립트", "JavaScirpt"], hint: "보기가 제공된 문제에서는 힌트를 제공하지 않습니다." }
];

// 
//  런타임 상태
// 
var userMap = {};   // { hash → { name, updatedAt } }
var userData = {};   // { hash → { chat, lastChatAt, point, attend, attendRanks[], quizCorrect } }
var attendance = { dateKey: "", list: [] };  // { dateKey, list: [{hash, time}] }
var fortune = { dateKey: "", data: {} };  // { dateKey, data: {hash → fortune} }

// 퀴즈 런타임
var quizActive = false;
var currentQuiz = null;   // { q, a[], hint, _qid }
var quizAnswered = {};      // { hash → true }

// 퀴즈 당일 순서 캐시
var todayQuizDateKey = "";
var todayQuizOrder = [];  // QUIZ_BANK 인덱스 배열 (당일 시드 셔플)
var usedQuizIds = {};  // { idx → true }

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

// 
//  데이터 로드 / 저장
// 
function loadAll() {
    userMap = dbRead(FILE_USER_MAP, {});
    userData = dbRead(FILE_USER_DATA, {});
    attendance = dbRead(FILE_ATTENDANCE, { dateKey: "", list: [] });
    fortune = dbRead(FILE_FORTUNE, { dateKey: "", data: {} });
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

function isQuizTime() {
    var mins = new Date().getHours() * 60 + new Date().getMinutes();
    return mins <= 23 * 60 + 30;  // 00:00 ~ 23:30
}

function startQuizRound(msg) {
    var remaining, i, idx, pick, normAnswers, j;
    if (!isQuizTime()) {
        msg.reply("⏰ 지금은 퀴즈 가능 시간이 아닙니다.\n[퀴즈 가능 시간] 매일 00:00 ~ 23:30");
        return;
    }
    if (quizActive) {
        msg.reply("이미 퀴즈가 진행 중입니다.\n'!정답 (내용)' 으로 정답을 제출하세요!");
        return;
    }

    ensureTodayQuizOrder();
    remaining = [];
    for (i = 0; i < todayQuizOrder.length; i++) {
        idx = todayQuizOrder[i];
        if (!usedQuizIds[idx]) remaining.push(idx);
    }
    if (remaining.length < 5) {
        msg.reply("📦 오늘 남은 문제가 5개 미만이라 퀴즈를 종료합니다.\n내일 다시 도전해 주세요!");
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

    msg.reply("🧩 퀴즈 시작!\nQ. " + currentQuiz.q + "\n\n[ !정답 (내용) | !힌트 | !종료 ]");
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
    if (!ans) { msg.reply("정답 형식: '!정답 (내용)'"); return; }
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
//  관리자: 대리 출석
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
//  메인 리스너
// 
bot.addListener(Event.MESSAGE, function (msg) {
    var room = msg.room;
    var senderName = msg.author.name;
    var senderHash = msg.author.hash || senderName;  // Android 11 미만 fallback
    var content = msg.content;
    var isTarget = (room === TARGET_ROOM);
    var isAdminDM = (!msg.isGroupChat && senderName === ADMIN_NAME);

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

        if (content === "!!매핑초기화") {
            userMap = {};
            saveUserMap();
            msg.reply("✅ 해시↔닉네임 매핑을 초기화했어요.\n(다음 채팅 수신 전까지 닉네임 검색이 작동하지 않습니다.)"); return;
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
    var isAdmin = (senderName === ADMIN_NAME);

    // 채팅 카운트 + 포인트 (관리자 제외)
    if (!isAdmin) {
        recordChat(senderHash);
        addChatPoint(senderHash);
        saveUserData();
    }

    //  퀴즈 진행 중: 퀴즈 관련 외 명령 차단 
    if (quizActive) {
        if (content.indexOf("!") === 0) {
            if (content.indexOf("!정답") === 0) {
                submitAnswer(senderHash, displayName, content.replace(/^!정답\s*/, ""), msg); return;
            }
            if (content === "!힌트") {
                msg.reply("💡 힌트: " + currentQuiz.hint); return;
            }
            if (content === "!종료") {
                stopQuiz(msg, "🛑 퀴즈를 종료했습니다."); return;
            }
            msg.reply("⛔️ 퀴즈 진행 중입니다.\n퀴즈 중에는 !정답 / !힌트 / !종료 만 사용 가능합니다."); return;
        }
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
        saveUserData(); saveAttendance();
        msg.reply(
            displayName + " 님, " + fRes.rank + "등으로 출석 완료했어요! " + medalOf(fRes.rank) + " 🎉\n"
            + "이번 출석으로 " + fRes.earnedPoint + "점 적립했어요.\n\n"
            + "⚠️경고⚠️\n"
            + "강제출석명령을 사용하셨습니다.\n"
            + "자동 출석을 우선으로 사용하여야 하며,\n자동 출석이 불가피한 경우 반드시 이한님께 말씀해주세요."
        );
        return;
    }

    //  자동 출석 
    if (isAttendanceTime() && !isAdmin && !hasAttendedToday(senderHash)) {
        var aRes = doAttend(senderHash);
        saveUserData(); saveAttendance();
        msg.reply(
            displayName + " 님, " + aRes.rank + "등으로 출석 완료했어요! " + medalOf(aRes.rank) + " 🎉\n"
            + "이번 출석으로 " + aRes.earnedPoint + "점 적립했어요."
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

    if (content.indexOf("!정답") === 0) {
        submitAnswer(senderHash, displayName, content.replace(/^!정답\s*/, ""), msg); return;
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

    // !뽑기
    if (content === "!뽑기") {
        var today = getTodayKey();
        ensureUser(senderHash);
        var u = userData[senderHash];

        // 날짜가 바뀌면 횟수 초기화
        if (u.drawDate !== today) {
            u.drawCount = 0;
            u.drawDate = today;
        }

        if (u.drawCount >= 5) {
            msg.reply(displayName + " 님, 오늘 뽑기 횟수를 모두 사용하셨어요. 😢\n내일 다시 도전해 주세요!");
            saveUserData();
            return;
        }

        u.drawCount += 1;
        var remaining = 5 - u.drawCount;
        var isWin = (Math.floor(Math.random() * 10) === 0); // 10분의 1 확률

        if (isWin) {
            u.point += 10;
            saveUserData();
            msg.reply(
                "🎊 축하합니다, " + displayName + " 님!\n"
                + "뽑기에서 당첨되셨어요! 🎉\n"
                + "(+10점 적립)\n\n"
                + "오늘 남은 뽑기 횟수: " + remaining + "회"
            );
        } else {
            saveUserData();
            msg.reply(
                "😔 꽝! " + displayName + " 님\n"
                + "이번엔 운이 따르지 않았네요...\n\n"
                + "오늘 남은 뽑기 횟수: " + remaining + "회"
            );
        }
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
    if (content === "!생존확인" || content === "!생존신고" || content === "JAVA_HOME") {
        msg.reply("이 메시지가 전송된다면 살아있다는 것 입니다."); return;
    }
    if (content === "!코스" || content === "!코스프레" || content === "cos") {
        msg.reply("이 메시지가 전송된다면 이한봇도 코스프레를 하고싶다는 것 입니다."); return;
    }

    //  도움말 
    if (content === "!") {
        msg.reply(
            "📌 이한봇 기능안내 💬\n\n"
            + "출석하기\n"
            + " • 아침에 채팅치면 자동으로 출석! 🎉\n"
            + " • !출석랭킹 – 오늘 출석 순서 📋\n"
            + " • !출석통계 – 누적 출석일수 + 평균등수 📊\n\n"
            + "나와 남을 아는 시간\n"
            + " • !나 – 내 정보 보기 🧑‍💻\n"
            + " • !남 (닉네임) – 닉네임 포함 검색 👤\n"
            + " • !멤버통계 – 전체 멤버 종합 통계 📈\n\n"
            + "랜덤의 맛\n"
            + " • !밥 / !디저트 – 음식 추천 🍽️🍰\n"
            + " • !명언 / !운세 – 명언 또는 오늘의 운세 🔮\n"
            + " • !뽑기 – 10분의 1 확률 행운 뽑기 🎰 (하루 5회)\n\n"
            + "퀴즈\n"
            + " • !퀴즈 – 퀴즈 시작\n"
            + " • !퀴즈랭킹 – 퀴즈 정답 누적 랭킹 🏆\n\n"
            + "문제 발생 시 관리자에게 문의해주세요. (v5.2)"
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
        if (content.indexOf("🚨🚨어? ") === 0) {
            msg.reply("여기, 이한봇이 있어요!\n심심하시면 이한봇을 사용해 보는 것은 어떨까요?\n\n! 만 입력 후 전송하시면 사용방법 나와요"); return;
        }
    }
});

// 
//  액티비티 이벤트
// 
bot.addListener(Event.ACTIVITY_CREATE, function (activity) {
    var tv = new android.widget.TextView(activity);
    tv.setText("CosBot v5.1");
    tv.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(tv);
});
bot.addListener(Event.ACTIVITY_START, function () { });
bot.addListener(Event.ACTIVITY_RESUME, function () { });
bot.addListener(Event.ACTIVITY_PAUSE, function () { });
bot.addListener(Event.ACTIVITY_STOP, function () { });