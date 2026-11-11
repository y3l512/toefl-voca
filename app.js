/* ==========================================================================
   iOS 18 Modern Blue Vocabulary Flashcard App Logic
   With High-Accuracy Google GTX + Free Dictionary API & 300+ Curated TOEFL Sentences
   ========================================================================== */

// --- Comprehensive 2026 TOEFL Academic Sentences & Korean Translations Map ---
const TOEFL_SENTENCE_MAP = {
  "prevail": { en: "Scientific truth will eventually prevail over unfounded speculation in academic discourse.", ko: "학술적 담론에서 근거 없는 추측보다는 결국 과학적 진실이 우세를 점할 것이다." },
  "intoxication": { en: "Severe alcohol intoxication severely impairs neurocognitive functions and fine motor skills.", ko: "심각한 알코올 취함은 신경 인지 기능과 미세 운동 능력을 크게 저해한다." },
  "reveler": { en: "Thousands of cheerful revelers gathered in the historic square to celebrate the festival.", ko: "수천 명의 흥겨운 환락을 즐기는 사람들이 축제를 기념하기 위해 역사적인 광장에 모였다." },
  "dithyramb": { en: "Ancient Greek choruses performed a dramatic dithyramb to honor Dionysus during religious festivals.", ko: "고대 그리스 합창단은 종교 축제 기간 동안 디오니소스를 찬양하기 위해 웅장한 디티람보스를 연주했다." },
  "illustrious": { en: "The Nobel laureate enjoyed an illustrious academic career in astrophysics research.", ko: "노벨상 수상자는 천체물리학 연구 분야에서 저명하고 걸출한 학술적 경력을 누렸다." },
  "full-fledged": { en: "The pilot program rapidly evolved into a full-fledged international research initiative.", ko: "그 파일럿 프로그램은 온전한 국제 연구 이니셔티브로 빠르게 발전했다." },
  "refinement": { en: "Technological refinement significantly improved the precision of laboratory measuring instruments.", ko: "기술적 정제와 개선을 통해 실험실 측정 기기의 정밀도가 향상되었다." },
  "alleviate": { en: "Targeted clinical therapies help alleviate chronic stress and enhance neurological health.", ko: "맞춤형 임상 치료법은 만성 스트레스를 완화하고 신경학적 건강을 증진하는 데 도움을 준다." },
  "distress": { en: "Prolonged drought conditions caused acute economic and environmental distress across the region.", ko: "장기화된 가뭄 조건은 지역 전역에 심각한 경제적·환경적 고통을 유발했다." },
  "serendipitous": { en: "The discovery of Alexander Fleming's penicillin was a serendipitous milestone in modern medicine.", ko: "알렉산더 플레밍의 페니실린 발견은 현대 의학사에서 뜻밖의 발견을 한 이정표였다." },
  "fortuitous": { en: "A fortuitous alignment of atmospheric conditions allowed astronomers to observe the eclipse clearly.", ko: "행운의 대기 조건 일치 덕분에 천문학자들은 개기일식을 명확하게 관측할 수 있었다." },
  "dissipate": { en: "Rising atmospheric heat caused the morning coastal fog to dissipate rapidly by noon.", ko: "상승하는 대기 열로 인해 해안가의 아침 안개가 정오 무렵 빠르게 소멸되었다." },
  "intrigue": { en: "Fossilized footprints discovered in Antarctica continue to intrigue paleoclimatologists worldwide.", ko: "남극에서 발견된 화석 발자국은 전 세계 고기후학자들을 계속해서 아주 흥미롭게 만든다." },
  "efficacy": { en: "Rigorous empirical trials confirmed the high therapeutic efficacy of the new clinical drug.", ko: "엄격한 실증적 시험을 통해 신약의 높은 치료 효능이 확인되었다." },
  "neurological": { en: "Neuroscientists investigate the complex neurological pathways responsible for long-term memory.", ko: "신경과학자들은 장기 기억을 담당하는 복잡한 신경학적 경로를 연구한다." },
  "induce": { en: "Certain environmental pollutants can induce oxidative stress in cellular structures.", ko: "특정 환경 오염물질은 세포 구조 내에서 산화 스트레스를 유발할 수 있다." },
  "consolidate": { en: "Adequate REM sleep plays a crucial role in consolidating newly acquired knowledge in the brain.", ko: "적절한 렘수면은 뇌에서 새로 습득한 지식을 굳히고 통합하는 데 결정적인 역할을 한다." },
  "strategic": { en: "The university formulated a strategic research plan to promote interdisciplinary innovation.", ko: "대학은 학제 간 혁신을 촉진하기 위해 전략적인 연구 계획을 수립했습니다." },
  "consistent": { en: "The experimental measurements yielded consistent results across multiple independent trials.", ko: "실험 측정 결과는 여러 독립적인 시도 전반에 걸쳐 일관된 결과를 보여주었습니다." },
  "rigorous": { en: "The academic journal maintains a rigorous peer-review process to ensure scientific integrity.", ko: "학술 저널은 과학적 진실성을 보장하기 위해 엄격한 동료 평가 절차를 유지합니다." },
  "subconscious": { en: "Subconscious cognitive processes often influence human decision-making without explicit awareness.", ko: "잠재의식적인 인지 과정은 종래 명시적 인식 없이도 인간의 의사 결정에 영향을 미칩니다." },
  "overstate": { en: "Economists caution researchers not to overstate the short-term impacts of fiscal policy changes.", ko: "경제학자들은 재정 정책 변화의 단기적 영향을 과장하지 말라고 연구자들에게 권고합니다." },
  "oppression": { en: "Historical narratives record the continuous struggle of marginalized citizens against societal oppression.", ko: "역사적 서사는 사회적 억압에 맞선 소외된 시민들의 지속적인 투쟁을 기록하고 있습니다." },
  "repression": { en: "Political repression during the autocratic regime severely restricted freedom of speech.", ko: "독재 정권 시절의 정치적 진압과 억압은 표현의 자유를 엄격히 제한했습니다." },
  "involvement": { en: "Community involvement is essential for the successful execution of urban restoration projects.", ko: "도시 재생 프로젝트의 성공적인 실행을 위해서는 지역 사회의 개입과 관여가 필수적입니다." },
  "aristocratic": { en: "The museum exhibits rare artifacts formerly owned by wealthy aristocratic families in Europe.", ko: "박물관에는 유럽의 부유한 귀족 가문이 소유했던 희귀한 유물들이 전시되어 있습니다." },
  "grandeur": { en: "Visitors were awestruck by the architectural grandeur of the ancient royal palace.", ko: "방문객들은 고대 왕궁의 건축적 장엄함과 위엄에 경탄을 금치 못했습니다." },
  "inward": { en: "The philosopher encouraged an inward journey of self-reflection to discover personal values.", ko: "철학자는 개인의 가치를 발견하기 위해 내면을 향한 자아 성찰의 여정을 권장했습니다." },
  "patronage": { en: "Renaissance artists flourished largely due to the generous financial patronage of wealthy merchants.", ko: "르네상스 예술가들은 주로 부유한 상인들의 관대한 재정적 후원 덕분에 번성했습니다." },
  "unpretentious": { en: "Despite international acclaim, the author maintained a humble and unpretentious lifestyle.", ko: "세계적인 찬사에도 불구하고 그 작가는 겸손하고 허세 부리지 않는 수수한 생활 방식을 유지했습니다." },
  "compositional": { en: "Art critics highlighted the striking compositional balance of light and shadow in the painting.", ko: "미술 평론가들은 그림 속 빛과 그림자의 뛰어난 구도적 균형을 강조했습니다." },
  "meticulous": { en: "The archaeologist conducted a meticulous examination of the ancient clay tablet inscriptions.", ko: "고고학자는 고대 점토판 비문에 대한 꼼꼼하고 세심한 조사를 진행했다." },
  "strain": { en: "Biologists discovered a resilient strain of bacteria capable of surviving extreme climate conditions.", ko: "생물학자들은 극심한 기후 조건에서도 살아남을 수 있는 탄력적인 세균 변종을 발견했습니다." },
  "variety": { en: "The tropical rainforest harbors an extraordinary variety of botanical and animal species.", ko: "열대 우림은 놀라울 정도로 다양한 식물 및 동물 품종과 종류를 품고 있습니다." },
  "synthetic": { en: "Modern chemical engineering produces synthetic polymers with high thermal resistance.", ko: "현대 화학 공학은 높은 열 저항성을 가진 합성 인조 고분자를 생산한다." },
  "germination": { en: "Optimal humidity and warmth accelerate seed germination in greenhouse cultivation.", ko: "최적의 습도와 온기는 온실 재배에서 씨앗의 발아 및 싹뜸을 촉진합니다." },
  "germinate": { en: "Botanical seeds require specific soil warmth and moisture to germinate effectively.", ko: "식물 씨앗이 효과적으로 발아하려면 특정 흙의 온기와 습도가 필요하다." },
  "eradicate": { en: "Global public health campaigns aim to eradicate infectious diseases through mass vaccination.", ko: "세계 공중보건 캠페인은 집단 백신 접종을 통해 전염병을 근절하는 것을 목표로 한다." },
  "impede": { en: "Cumbersome bureaucratic regulations can severely impede breakthrough scientific innovation.", ko: "성가신 관료적 규제는 획기적인 과학 혁신을 심각하게 방해하고 지연시킬 수 있다." },
  "syncretic": { en: "Ancient Mediterranean cultures developed a syncretic blend of religious traditions and philosophies.", ko: "고대 지중해 문화권은 종교적 전통과 철학의 융합적인 혼합 체계를 발전시켰다." },
  "syncretism": { en: "Cultural syncretism occurs when distinct religious customs merge over generations.", ko: "문화적 혼합주의는 서로 다른 종교적 관습이 세대를 거쳐 융합될 때 일어납니다." },
  "amalgamation": { en: "The architectural design represents a harmonious amalgamation of classical and modern aesthetics.", ko: "그 건축 디자인은 고전적 미학과 현대적 미학의 조화로운 융합을 나타낸다." },
  "indigenous": { en: "Ecologists work to protect indigenous plant species from invasive foreign vegetation.", ko: "생태학자들은 침입 외래 식물로부터 토착 원주민 식물 종을 보호하기 위해 노력한다." },
  "strive": { en: "Researchers strive to synthesize renewable energy solutions to combat global climate change.", ko: "연구원들은 전 세계 기후 변화에 대응하기 위해 재생 에너지 솔루션을 합성하고자 고군분투한다." },
  "veneer": { en: "Behind a sophisticated academic veneer lies a deeply flawed theoretical methodology.", ko: "세련된 학술적 겉치레 뒤에는 깊이 결함이 있는 이론적 방법론이 숨어 있다." },
  "propitiation": { en: "Ancient tribes offered ritual sacrifices as a propitiation to appease angry deities.", ko: "고대 부족들은 성난 신들을 달래기 위해 위로와 속죄의 의식으로 제물을 바쳤습니다." },
  "appease": { en: "The government took immediate economic measures to appease public discontent.", ko: "정부는 대중의 불만을 달래기 위해 즉각적인 경제 조치를 취했습니다." },
  "rite": { en: "The sacred rite of passage marked a youth's transition into full adult status in the tribe.", ko: "신성한 통과의례는 부족 내에서 청소년이 성인 신분으로 전환됨을 알렸습니다." },
  "veneration": { en: "Scholars expressed deep veneration for the pioneering discoveries of early astronomers.", ko: "학자들은 초기 천문학자들의 선구적인 발견에 대해 깊은 존경과 공경을 표했습니다." },
  "stratification": { en: "Sociological research highlights the impact of economic stratification on educational access.", ko: "사회학 연구는 교육 접근성에 미치는 경제적 계층화의 영향을 강조한다." },
  "pinnacle": { en: "Winning the prestigious research award represented the pinnacle of her scientific career.", ko: "권위 있는 연구상을 수상한 것은 그녀의 과학적 커리어의 정점이자 절정이었다." },
  "facade": { en: "The historic museum retains its original neoclassical facade while housing modern galleries.", ko: "그 역사적인 박물관은 현대적인 미술관을 내부에 갖추면서도 원래의 신고전주의 건물 정면을 유지하고 있다." },
  "conform": { en: "Engineers ensured that all structural materials conform strictly to international safety standards.", ko: "엔지니어들은 모든 구조 재료가 국제 안전 기준에 엄격히 부합하고 따르도록 했습니다." },
  "coreligionist": { en: "Pious travelers sought refuge among their coreligionists in foreign territories.", ko: "경건한 여행자들은 타국 영토에서 같은 종교를 믿는 사람들의 구호를 받았습니다." },
  "in accordance with": { en: "The research experiment was conducted in accordance with established ethical guidelines.", ko: "연구 실험은 확립된 윤리적 지침에 부합하여 진행되었습니다." },
  "propagation": { en: "Radio waves facilitate the rapid propagation of communication signals across long distances.", ko: "전파는 먼 거리까지 통신 신호의 신속한 전파와 전달을 촉진한다." },
  "excessive": { en: "Excessive consumption of processed sugar increases the risk of metabolic disorders.", ko: "가공 설탕의 과도한 섭취는 대사 장애의 위험을 증가시킵니다." },
  "molecule": { en: "Water is a simple molecule composed of two hydrogen atoms and one oxygen atom.", ko: "물은 두 개의 수소 원자와 하나의 산소 원자로 구성된 단순한 분자입니다." },
  "enzyme": { en: "Digestive enzymes accelerate chemical reactions necessary for nutrient absorption.", ko: "소화 효소는 영양분 흡수에 필요한 화학 반응을 촉진합니다." },
  "powerhouse": { en: "Mitochondria are often described as the energetic powerhouse of eukaryotic cells.", ko: "미토콘드리아는 흔히 진핵세포의 에너지를 생화학적으로 공급하는 강자로 설명됩니다." },
  "intermediary": { en: "The neutral diplomat acted as an intermediary during sensitive international negotiations.", ko: "중립적인 외교관은 민감한 국제 협상 과정에서 중개인 및 매개자 역할을 수행했습니다." },
  "lucrative": { en: "The commercialization of green technology proved to be a highly lucrative venture.", ko: "친환경 기술의 상업화는 매우 수익성이 좋고 돈이 되는 사업임이 입증되었다." },
  "hostility": { en: "Diplomatic talks sought an immediate cessation of armed hostility between the nations.", ko: "외교 회담은 국가 간의 무장 적대 행위와 교전의 즉각적인 중단을 모색했다." },
  "vessel": { en: "The naval vessel safely navigated through turbulent waters during the arctic storm.", ko: "해군 선박은 북극 폭풍 동안 거친 파도를 안전하게 항해했습니다." },
  "peninsula": { en: "The mountainous peninsula extends strategically into the Mediterranean Sea.", ko: "산악 지대의 반도는 지중해로 전략적으로 뻗어 있습니다." },
  "cessation": { en: "The signing of the peace treaty led to a permanent cessation of military conflicts.", ko: "평화 조약 서명은 군사적 충돌의 영구적인 중단과 중지로 이어졌다." },
  "mitigate": { en: "Environmental policies were enacted to mitigate the adverse effects of carbon emissions.", ko: "탄소 배출의 부작용을 완화하고 경감하기 위해 환경 정책이 제정되었다." },
  "partial": { en: "The solar satellite captured a partial eclipse of the sun over North America.", ko: "태양 위성은 북미 상공에서 일어난 부분적인 일식을 포착했습니다." },
  "bypass": { en: "The new highway route allows heavy traffic to bypass congestion in the city center.", ko: "새로운 도로 노선은 대형 트래픽이 도심의 혼잡을 우회하도록 해줍니다." },
  "nerve": { en: "Sensory nerve signals transfer electrical impulses directly from organs to the brain.", ko: "감각 신경 신호는 전기 자극을 장기에서 뇌로 직접 전달합니다." },
  "frequency": { en: "Radio stations broadcast signals at specific electromagnetic frequencies to prevent signal crossover.", ko: "방송국은 신호 교차를 막기 위해 특정 전자기 주파수로 신호를 송출합니다." },
  "extensive": { en: "Scientists conducted extensive fieldwork to document rare botanical species in the jungle.", ko: "과학자들은 정글의 희귀 식물 종을 기록하기 위해 광범위한 현장 조사를 실시했습니다." },
  "clinical": { en: "Phase three clinical trials demonstrated a significant improvement in patient outcome.", ko: "3단계 임상 시험은 환자의 상태 개선에 유의미한 효과가 있음을 보여주었습니다." },
  "plasticity": { en: "Neural plasticity enables the human brain to adapt and reorganize after traumatic injuries.", ko: "신경 가소성은 인간의 뇌가 외상적 부상 후에도 적응하고 재구성될 수 있도록 합니다." },
  "electrode": { en: "Researchers attached sensitive electrodes to measure electrical brainwaves during sleep.", ko: "연구진은 수면 중 뇌파 수치를 측정하기 위해 민감한 전극을 부착했습니다." },
  "precision": { en: "High-precision laser technology allows surgeons to perform delicate ocular procedures.", ko: "고정밀 레이저 기술은 의사들이 미세한 안과 수술을 시행할 수 있게 합니다." },
  "discrepancy": { en: "Auditors identified a noticeable discrepancy between reported profits and actual bank statements.", ko: "감사인들은 보고된 이익과 실제 은행 내역서 사이의 현저한 차이를 발견했습니다." },
  "undocumented": { en: "Historians strive to uncover undocumented stories of early immigrant communities.", ko: "역사학자들은 초기 이민자 사회의 문서로 남지 않은 이야기들을 발굴하려 애씁니다." },
  "assortment": { en: "The bakery offers a delicious assortment of handcrafted pastries and artisan breads.", ko: "베이커리는 손으로 직접 만든 제과류와 수제 빵의 다양한 모음을 제공합니다." },
  "adapt": { en: "Species that fail to adapt to rapid climate variations face heightened extinction risks.", ko: "급격한 기후 변화에 적응하지 못하는 종은 높은 멸종 위기에 직면합니다." },
  "bear": { en: "Concrete columns must bear the tremendous structural weight of the skyscraper.", ko: "콘크리트 기둥은 초고층 건물의 엄청난 구조적 하중을 감당하고 지탱해야 합니다." },
  "admit": { en: "The university decided to admit a diverse group of highly qualified international candidates.", ko: "대학은 높은 자격을 갖춘 다양한 국제 지원자들을 입학시키고 받아들이기로 결정했습니다." },
  "sparsity": { en: "The sparsity of archaeological evidence makes reconstructing ancient language dialects difficult.", ko: "고고학적 증거의 희소성과 부족함은 고대 언어 방언을 복원하는 것을 어렵게 만든다." },
  "cavity": { en: "Dentists recommend regular brushing to prevent bacterial decay inside the tooth cavity.", ko: "치과의사들은 치아 구멍과 빈 공간 내부의 세균성 부식을 막기 위해 정기적인 양치질을 권장합니다." },
  "perception": { en: "Cognitive psychology explores how sensory inputs shape human perception of reality.", ko: "인지 심리학은 감각 입력이 현실에 대한 인간의 지각과 인식을 어떻게 형성하는지 탐구한다." },
  "resolution": { en: "High-definition screens offer superior image resolution and vibrant color clarity.", ko: "고해상도 화면은 우수한 이미지 선명도와 생생한 색상 해상도를 제공합니다." },
  "distinguish": { en: "Advanced satellite imaging allows geologists to distinguish subtle differences in rock formations.", ko: "첨단 위성 영상 기법을 통해 지질학자들은 암석 형성의 미세한 차이를 구별하고 분간할 수 있다." },
  "tone": { en: "The author adopted a serious academic tone when addressing complex ethical dilemmas.", ko: "저자는 복잡한 윤리적 딜레마를 다룰 때 진지한 학술적 어조와 음색을 채택했습니다." },
  "orthodox": { en: "Her innovative research challenged orthodox scientific theories long held in astrophysics.", ko: "그녀의 혁신적인 연구는 천체물리학 분야에서 오랫동안 유지되어 온 정통적 이론에 이의를 제기했습니다." },
  "monotheism": { en: "The historical transition to monotheism fundamentally reshaped religious belief systems.", ko: "유일신교로의 역사적 전환은 종교적 신앙 체계를 근본적으로 재형성했다." },
  "particular": { en: "Botanists paid particular attention to the unique flowering patterns of the desert cactus.", ko: "식물학자들은 사막 선인장의 독특한 개화 패턴에 특별한 관심을 기울였습니다." },
  "usher": { en: "The invention of the steam engine helped usher in the Industrial Revolution across Europe.", ko: "증기 기관의 발명은 유럽 전역에 산업 혁명의 시작을 알리고 도입하는 데 기여했다." },
  "declaration": { en: "The leaders issued a formal declaration emphasizing their commitment to environmental protection.", ko: "지도자들은 환경 보호에 대한 의지를 강조하는 공식 선언을 발표했습니다." },
  "premature": { en: "Experts warned that drawing final conclusions at this stage would be premature.", ko: "전문가들은 이 단계에서 최종 결론을 내리는 것은 시기상조라고 경고했습니다." },
  "hypothetically": { en: "Hypothetically, if atmospheric carbon levels double, global ocean temperatures will rise significantly.", ko: "가상으로 가설을 세우자면, 대기 중 탄소 농도가 두 배가 되면 전 세계 해수온이 크게 상승할 것입니다." },
  "frivolous": { en: "The court dismissed the lawsuit, characterizing the claims as frivolous and lacking evidence.", ko: "법원은 해당 주장이 경박하고 증거가 부족하다고 판단하여 소송을 기각했습니다." },
  "tackle": { en: "International coalitions formed to tackle the complex challenges of oceanic microplastic pollution.", ko: "해양 미세플라스틱 오염이라는 힘든 문제를 다루고 씨름하기 위해 국제 연합이 결성되었다." },
  "prejudice": { en: "Sociologists investigate how education can reduce ingrained racial prejudice in urban areas.", ko: "사회학자들은 교육이 도시 지역의 뿌리 깊은 인종적 편견을 어떻게 줄일 수 있는지 연구합니다." },
  "explicitly": { en: "The laboratory manual explicitly states the mandatory safety procedures for handling chemicals.", ko: "실험실 지침서에는 화학 물질을 다루기 위한 필수 안전 절차가 명시적으로 서술되어 있습니다." },
  "hatred": { en: "Peace ambassadors worked tirelessly to rebuild trust and eradicate historical hatred.", ko: "평화 대사들은 신뢰를 회복하고 역사적 증오를 근절하기 위해 지칠 줄 모르고 노력했습니다." },
  "innate": { en: "Human infants appear to possess an innate capacity for basic mathematical intuition.", ko: "인간 아기는 기초적인 수학적 직관에 대한 타고난 능력을 지니고 있는 것으로 보입니다." },
  "extent": { en: "Researchers are still assessing the full extent of ecological damage caused by the oil spill.", ko: "연구진은 원유 유출로 인한 생태계 피해의 전체 규모와 정도를 여전히 평가하고 있습니다." },
  "endearment": { en: "Using warm terms of endearment helps strengthen emotional bonds within family relationships.", ko: "다정한 애정 표현 언어를 사용하는 것은 가족 관계에서 정서적 유대를 강화하는 데 도움이 됩니다." },
  "instill": { en: "Effective mentors instill confidence and critical thinking skills in young scholars.", ko: "훌륭한 멘토는 젊은 학자들에게 자긍심과 비판적 사고 능력을 서서히 불어넣어 줍니다." },
  "theoretical": { en: "Quantum physics relies heavily on advanced theoretical models before experimental confirmation.", ko: "양자 물리학은 실험적 검증 이전에 고도의 이론적 모델에 크게 의존합니다." },
  "doubt": { en: "Rigorous scientific evidence left little room for doubt regarding the validity of the hypothesis.", ko: "엄격한 과학적 증거는 가설의 유효성에 대해 의심의 여지를 거의 남기지 않았습니다." },
  "random manner": { en: "Subjects were assigned to experimental control groups in a purely random manner.", ko: "피험자들은 순전히 무작위 방식으로 실험 대조군에 배정되었습니다." },
  "outcompete": { en: "Invasive plant species often outcompete native vegetation for soil nutrients and sunlight.", ko: "침입 외래 식물 종은 토양 영양분과 햇빛을 두고 종종 토착 식물과의 경쟁에서 이깁니다." },
  "withstand": { en: "Engineers designed the suspension bridge to withstand powerful hurricane winds and earthquakes.", ko: "엔지니어들은 강력한 허리케인 바람과 지진을 견뎌내도록 현수교를 설계했습니다." },
  "clog": { en: "Accumulated debris can quickly clog industrial drainage pipes during severe rainstorms.", ko: "쌓인 쓰레기는 폭우 시 산업용 배수관을 빠르게 막히게 할 수 있습니다." },
  "divert": { en: "Authorities constructed canal channels to divert floodwaters away from residential communities.", ko: "당국은 주거 지역으로부터 홍수물을 우회시키고 방향을 바꾸기 위해 운하를 건설했습니다." },
  "unintentional": { en: "The statistical discrepancy was determined to be an unintentional human error in data logging.", ko: "통계적 불일치는 데이터 기록 과정에서의 의도치 않은 인적 실수로 밝혀졌습니다." },
  "retain": { en: "The ancient parchment manuscripts managed to retain their vivid ink colors after centuries.", ko: "고대 양피지 원고는 수세기가 지난 후에도 생생한 잉크 색상을 유지할 수 있었습니다." },
  "disposition": { en: "Genetic predispositions can influence an individual's psychological disposition under stress.", ko: "유전적 소인은 스트레스 상황에서 개인의 심리적 성향과 기질에 영향을 미칠 수 있습니다." },
  "accordingly": { en: "When market conditions change, investors must adjust their economic strategies accordingly.", ko: "시장 조건이 변할 때 투자자들은 상황에 부응하여 경제 전략을 조정해야 합니다." },
  "conscious": { en: "Meditators aim to cultivate a high level of conscious awareness during daily activities.", ko: "명상가들은 일상 활동 중 높은 수준의 의식적인 인지 상태를 함양하는 것을 목표로 합니다." },
  "extend": { en: "The research grant enabled scientists to extend their oceanic expedition by three months.", ko: "연구 보조금 덕분에 과학자들은 해양 탐사 기간을 3개월 연장할 수 있었습니다." },
  "adolescence": { en: "Adolescence is a pivotal developmental period characterized by rapid biological and cognitive changes.", ko: "청소년기는 급격한 생물학적·인지적 변화가 특징인 결정적인 발달 단계입니다." },
  "comprise": { en: "The academic committee is comprised of distinguished scholars from various scientific fields.", ko: "학술 위원회는 다양한 과학 분야의 저명한 학자들로 구성되어 있습니다." },
  "bipedalism": { en: "The evolutionary transition to bipedalism allowed early hominids to carry tools efficiently.", ko: "직립 보행으로의 진화적 전환은 초기 인류가 도구를 효율적으로 휴대할 수 있도록 해주었습니다." },
  "intact": { en: "Archaeologists were amazed to find the ancient burial chamber fully intact after thousands of years.", ko: "고고학자들은 수천 년이 지났음에도 고대 매장실이 손상되지 않고 온전한 것을 보고 놀라움에 휩싸였습니다." },
  "adept": { en: "The experienced researcher became highly adept at analyzing complex genomic sequences.", ko: "경험 많은 연구자는 복잡한 유전체 서열 분석에 매우 숙련되고 능숙해졌습니다." },
  "speculator": { en: "Financial speculators bought vast tracts of undeveloped land in anticipation of urban expansion.", ko: "금융 투기꾼들은 도시 확장을 예상하고 개발되지 않은 방대한 토지를 매입했습니다." },
  "claimant": { en: "Insurance claimants filed paperwork requesting compensation for disaster damage.", ko: "보험 청구인들은 재해 피해 보상을 요청하는 서류를 제출했습니다." },
  "lax": { en: "Lax enforcement of environmental regulations resulted in increased chemical emissions.", ko: "환경 규제에 대한 느슨하고 헐거운 단속은 화학물질 배출량 증가로 이어졌습니다." },
  "seize": { en: "Military commanders moved quickly to seize control of vital transport hubs.", ko: "군 사령관들은 주요 교통 요충지를 장악하고 차지하기 위해 신속하게 움직였습니다." },
  "tract": { en: "The national park encompasses a vast tract of wilderness home to endangered wildlife.", ko: "국립공원은 멸종 위기 야생동물의 서식지인 방대한 토지 구역을 포괄합니다." },
  "lumber": { en: "Timber companies harvested sustainable lumber for residential housing construction.", ko: "목재 회사들은 주택 건설을 위해 지속 가능한 목재를 수확했습니다." },
  "cattle rancher": { en: "Cattle ranchers negotiated grazing rights on public lands with federal authorities.", ko: "목장주와 사육업자들은 연방 당국과 공공 토지에서의 방목 권리를 협상했습니다." },
  "stringent": { en: "Laboratories adhere to stringent quality control standards to prevent experimental contamination.", ko: "실험실은 실험 오염을 방지하기 위해 엄격하고 엄중한 품질 관리 기준을 고수합니다." },
  "coin": { en: "Linguists often study how internet communities coin new words to express modern feelings.", ko: "언어학자들은 인터넷 커뮤니티가 현대적 감정을 표현하기 위해 새로운 낱말을 어떻게 만들어 내는지 자주 연구합니다." },
  "derive": { en: "Many modern pharmaceutical drugs derive from natural compounds found in rainforest plants.", ko: "많은 현대 의약품은 열대우림 식물에서 발견되는 천연 화합물에서 유래하고 파생됩니다." },
  "deliberate": { en: "The strategic omission of data was deemed a deliberate attempt to manipulate research results.", ko: "데이터의 전략적 누락은 연구 결과를 조작하려는 고의적이고 의도적인 시도로 간주되었습니다." },
  "convergence": { en: "The convergence of artificial intelligence and biotechnology is opening novel research frontiers.", ko: "인공지능과 바이오기술의 수렴 및 융합은 새로운 연구의 지평을 열어가고 있습니다." },
  "subconsciousness": { en: "Unresolved psychological stress can subtly manifest in one's subconsciousness through dreams.", ko: "해결되지 않은 심리적 스트레스는 꿈을 통해 잠재의식 속에 미묘하게 나타날 수 있습니다." },
  "facilitate": { en: "Digital learning tools facilitate interactive student participation during remote lectures.", ko: "디지털 학습 도구는 원격 강의 중 학생들의 상호작용적 참여를 촉진하고 용이하게 만듭니다." },
  "lapse": { en: "A temporary lapse in concentration caused the technician to misread the gauge reading.", ko: "일시적인 집중력 착오로 인해 기술자가 계기판 수치를 잘못 읽었습니다." },
  "indicate": { en: "Initial satellite data indicate a gradual shift in ocean current temperatures.", ko: "초기 위성 데이터는 해류 온도의 점진적인 변화를 나타내고 보여줍니다." },
  "interaction": { en: "Social interaction is essential for healthy cognitive and emotional development in children.", ko: "사회적 상호작용은 아동의 건강한 인지적·정서적 발달에 필수적입니다." },
  "thalamus": { en: "The thalamus functions as the brain's primary relay station for sensory information.", ko: "시상은 감각 정보를 전달하는 뇌의 주요 중계소 역할을 합니다." },
  "cerebral cortex": { en: "Complex reasoning and language comprehension reside primarily within the cerebral cortex.", ko: "복잡한 추론과 언어 이해 능력은 주로 대뇌 피질 내에 위치하고 있습니다." },
  "rouse": { en: "Loud alarm signals were installed to rouse sleeping workers in case of industrial gas leaks.", ko: "산업 가스 유출 시 수면 중인 작업자들을 각성시키고 깨우기 위해 큰 경보 신호가 설치되었습니다." },
  "emotional regulation": { en: "Mindfulness therapy helps patients develop healthier strategies for emotional regulation.", ko: "마음챙김 치료는 환자들이 감정 조절을 위한 보다 건강한 전략을 개발하도록 돕습니다." },
  "indicative": { en: "Elevated white blood cell counts are often indicative of an active internal infection.", ko: "백혈구 수치의 상승은 종종 체내 활성 감염을 나타내고 시사합니다." },
  "coordination": { en: "Motor coordination requires seamless communication between the cerebellum and skeletal muscles.", ko: "운동 조정 및 조화는 소뇌와 골격근 사이의 원활한 소통을 필요로 합니다." },
  "clinical significance": { en: "The statistical findings carried profound clinical significance for future cancer therapies.", ko: "통계적 연구 결과는 향후 암 치료법에 있어 깊은 임상적 의의와 중요성을 지녔습니다." },
  "process": { en: "Supercomputers can process petabytes of climate data in a matter of minutes.", ko: "슈퍼컴퓨터는 단 몇 분 만에 페타바이트 규모의 기후 데이터를 처리할 수 있습니다." },
  "phototropism": { en: "Sunflowers exhibit phototropism by reorienting their flower heads toward daylight.", ko: "해바라기는 꽃봉오리를 햇빛을 향해 다시 방향을 바꿈으로써 굴광성을 보여줍니다." },
  "hormone": { en: "Growth hormones regulate cellular division and tissue development in living organisms.", ko: "성장 호르몬은 생물체 내에서 세포 분열과 조직 발달을 조절합니다." },
  "elongate": { en: "Plant cells elongate in response to auxin redistribution on the shaded side of the stem.", ko: "식물 세포는 줄기의 그늘진 쪽에 분포하는 옥신에 반응하여 길어지고 연장됩니다." },
  "increase energy production": { en: "Regular aerobic exercise prompts cellular mitochondria to increase energy production.", ko: "규칙적인 유산소 운동은 세포 미토콘드리아의 에너지 생산을 증가시키도록 유도합니다." },
  "adaptation": { en: "Camouflage is a striking evolutionary adaptation that helps prey evade predators.", ko: "위장은 포식자를 피하도록 돕는 놀라운 진화적 적응 형태입니다." },
  "seedling": { en: "Nursery staff carefully watered the young botanical seedling to ensure healthy root growth.", ko: "묘목장 직원들은 건강한 뿌리 성장을 위해 어린 식물 모종에 정성껏 물을 주었습니다." },
  "photosynthesis": { en: "Chloroplasts absorb sunlight energy to power the complex biochemical cycle of photosynthesis.", ko: "엽록체는 광합성의 복잡한 생화학적 사이클을 가동하기 위해 햇빛 에너지를 흡수합니다." },
  "feat": { en: "Building the transcontinental railway represented an extraordinary engineering feat.", ko: "대륙 횡단 철도 건설은 놀라운 공학적 위업이자 솜씨를 보여주었습니다." },
  "utilize": { en: "Solar panels utilize photovoltaic cells to convert light directly into electrical power.", ko: "태양광 판은 빛을 전기 에너지로 직접 전환하기 위해 광전지 수용체를 활용합니다." },
  "synthesize": { en: "Organic chemists succeeded in synthesizing a complex organic compound in the laboratory.", ko: "유기 화학자들은 실험실에서 복잡한 유기 화합물을 합성하는 데 성공했습니다." },
  "accumulate": { en: "Heavy metals can accumulate in aquatic food chains, posing ecological risks.", ko: "중금속은 수생 먹이 사슬 내에 축적되어 생태계 위험을 유발할 수 있습니다." },
  "trunk": { en: "The massive trunk of the ancient redwood tree measured over ten meters in diameter.", ko: "고대 레드우드 나무의 거대한 줄기와 몸통은 지름이 10미터가 넘었습니다." },
  "aqueduct": { en: "Ancient Roman engineers constructed stone aqueducts to transport fresh water to urban centers.", ko: "고대 로마 엔지니어들은 도시 중심부로 깨끗한 물을 수송하기 위해 석조 송수로를 건설했습니다." },
  "gutter": { en: "Rainwater flowed through the roof gutter system to prevent building foundation erosion.", ko: "빗물은 건물 기초 침식을 막기 위해 지붕 배수로 시스템을 통해 흘러갔습니다." },
  "map": { en: "Genomic researchers work tirelessly to map the entire genetic code of rare organisms.", ko: "유전체 연구자들은 희귀 생물의 전체 유전자 코드를 지도로 추적하고 작성하기 위해 일합니다." },
  "outbreak": { en: "Epidemiologists traced the origin of the viral outbreak to contaminated drinking water.", ko: "역학자들은 바이러스 발발과 발생의 원인을 오염된 식수로 추적했습니다." },
  "conclusive": { en: "DNA evidence provided conclusive proof that exonerated the wrongfully accused defendant.", ko: "DNA 증거는 억울하게 고소당한 피고인의 무죄를 입증하는 결정적인 증거를 제공했습니다." },
  "sewer": { en: "Modern civil sanitation upgrades improved the underground sewer infrastructure.", ko: "현대 도시 위생 개선 사업은 지하 하수관 및 하수도 기반 시설을 향상시켰습니다." },
  "implement": { en: "The administration plans to implement strict environmental conservation measures.", ko: "정부는 엄격한 환경 보전 조치를 시행하고 실행할 계획입니다." },
  "reek": { en: "Stagnant marshland water began to reek of decaying organic matter during summer.", ko: "고여 있는 습지 물은 여름 동안 부패하는 유기물의 악취를 풍기기 시작했습니다." },
  "rest on": { en: "Scientific theories must rest on verifiable empirical observations rather than assumption.", ko: "과학적 이론은 추정이 아닌 검증 가능한 실증적 관찰에 기초하고 달려있어야 합니다." },
  "hygienic": { en: "Maintaining hygienic laboratory conditions is essential to avoid bacterial contamination.", ko: "세균 오염을 막기 위해서는 위생적인 실험실 환경을 유지하는 것이 필수적입니다." },
  "filtration": { en: "Water filtration plants remove microscopic impurities to produce safe drinking water.", ko: "정수 여과 시설은 안전한 식수를 생산하기 위해 미세한 불순물을 제거합니다." },
  "bleach": { en: "Industrial facilities use diluted bleach solutions for surface sterilization.", ko: "산업 시설에서는 표면 소독을 위해 희석된 표백제 용액을 사용합니다." },
  "stench": { en: "An overpowering chemical stench filled the factory floor after the solvent leak.", ko: "용매 유출 후 공장 바닥에는 강렬한 화학적 악취가 가득 찼습니다." },
  "petition": { en: "Citizens submitted a signed petition demanding legislative action on clean air standards.", ko: "시민들은 깨끗한 공기 기준에 대한 입법 조치를 요구하는 서명된 청원서를 제출했습니다." },
  "legislature": { en: "The state legislature passed landmark laws protecting national forest reserves.", ko: "주 입법부와 의회는 국립 산림 보호 구역을 보호하는 획기적인 법안을 통과시켰습니다." },
  "diffusion": { en: "Cultural diffusion led to the sharing of artistic techniques across ancient trade routes.", ko: "문화적 확산은 고대 무역로를 통한 예술 기술의 공유로 이어졌습니다." },
  "suburb": { en: "Residential demand caused rapid urban development into the peaceful outer suburbs.", ko: "주거 수요로 인해 평화로운 외곽 근교와 교외로의 빠른 도시 개발이 이루어졌습니다." },
  "mount": { en: "Public pressure began to mount as environmental damage reports were published.", ko: "환경 피해 보고서가 출판됨에 따라 대중의 압박이 쌓이고 증가하기 시작했습니다." },
  "oversight": { en: "Independent audit committees provide crucial financial oversight for non-profit organizations.", ko: "독립적인 감사 위원회는 비영리 단체에 대해 중요한 재정적 감독과 관리를 제공합니다." },
  "intensify": { en: "Rising global temperatures could intensify extreme weather phenomena across continents.", ko: "상승하는 지구 온도는 대륙 전역에서 극심한 기후 현상을 더욱 격렬하게 만들고 심화시킬 수 있습니다." },
  "disparity": { en: "Economists analyze income disparity between rural communities and metropolitan areas.", ko: "경제학자들은 농촌 지역 사회와 대도시 지역 간의 소득 격차와 불균형을 분석합니다." },
  "inadequate": { en: "Inadequate rainfall led to crop failures and regional food supply shortages.", ko: "불충분하고 부적절한 강우량은 농작물 수확 실패와 지역 식량 공급 부족을 초래했습니다." },
  "comprehend": { en: "Advanced physics concepts can be difficult for introductory students to fully comprehend.", ko: "고급 물리학 개념은 입문 학생들이 완전히 이해하고 파악하기에 어려울 수 있습니다." },
  "encompass": { en: "The comprehensive survey will encompass environmental, economic, and social variables.", ko: "종합 조사는 환경적·경제적·사회적 변수를 모두 포함하고 아우를 것입니다." },
  "advent": { en: "The advent of digital computing fundamentally transformed global scientific communication.", ko: "디지털 컴퓨팅의 출현과 도래는 전 세계 과학 통신을 근본적으로 변화시켰습니다." },
  "paradigm": { en: "Quantum mechanics represented a fundamental paradigm shift in modern physics.", ko: "양자역학은 현대 물리학에서 근본적인 패러다임이자 인식 체계의 전환을 가져왔습니다." },
  "probability": { en: "Statisticians calculated the high probability of success for the clinical trial.", ko: "통계학자들은 임상 시험의 높은 성공 확률과 개연성을 계산했습니다." },
  "nuance": { en: "Experienced translators capture subtle emotional nuances in foreign literature.", ko: "숙련된 번역가들은 외국 문학에서 미묘한 감정적 차이와 뉘앙스를 포착해 냅니다." },
  "inadvertently": { en: "The technician inadvertently left the refrigeration system off overnight.", ko: "기술자는 무심코 의도치 않게 하룻밤 동안 냉동 시스템을 꺼 두었습니다." },
  "annotate": { en: "Scholars meticulously annotate ancient classical manuscripts with explanatory notes.", ko: "학자들은 고대 고전 원고에 설명 주석을 꼼꼼하게 달고 덧붙입니다." },
  "perceive": { en: "How individuals perceive risk heavily influences their financial investment choices.", ko: "개인이 위험을 어떻게 인식하고 이해하는지는 그들의 금융 투자 선택에 큰 영향을 미칩니다." },
  "interpretive": { en: "The museum guide provided an engaging interpretive narrative of the historical artifacts.", ko: "박물관 가이드는 역사적 유물에 대해 매력적인 해석적인 서사를 제공했습니다." },
  "interpretation": { en: "Multiple scholarly interpretations exist regarding the historical causes of the war.", ko: "전쟁의 역사적 원인에 관해 수많은 학술적 해석이 존재합니다." },
  "convey": { en: "Artistic expressions convey deep psychological emotions that words often fail to articulate.", ko: "예술적 표현은 언어로 설명하기 어려운 깊은 심리적 감정을 전달합니다." },
  "intake": { en: "Nutritionists monitor daily caloric intake to evaluate dietary wellness.", ko: "영양사들은 식단 건강성을 평가하기 위해 일일 칼로리 섭취와 수용을 모니터링합니다." },
  "adhere": { en: "Researchers must strictly adhere to established ethical safety protocols.", ko: "연구자들은 확립된 윤리적 안전 프로토콜을 엄격히 고수하고 따라야 합니다." },
  "marginalize": { en: "Socioeconomic policies should ensure they do not marginalize vulnerable communities.", ko: "사회경제적 정책은 취약 계층을 소외시키지 않도록 보장해야 합니다." },
  "obscure": { en: "Thick fog threatened to obscure the navigational view from the ship's bridge.", ko: "짙은 안개는 선박 조타실에서의 항해 시야를 가리고 모호하게 만들 위험이 있었습니다." },
  "impermanence": { en: "Eastern philosophy often emphasizes the impermanence of material worldly possessions.", ko: "동양 철학은 흔히 물질적 세상 소유물의 덧없음과 일시성을 강조합니다." },
  "commodity": { en: "Crude oil remains a highly traded global commodity influencing international markets.", ko: "원유는 국제 시장에 영향을 미치는 핵심적인 거래 상품 및 물품으로 남아 있습니다." },
  "ephemerality": { en: "Poets often write about the heartbreaking ephemerality of youth and spring blossoms.", ko: "시인들은 흔히 청춘과 봄꽃의 가슴 아픈 단명함과 덧없음에 대해 글을 씁니다." },
  "iteration": { en: "Engineers tested each technological iteration to eliminate software bugs efficiently.", ko: "엔지니어들은 소프트웨어 버그를 효율적으로 제거하기 위해 각 기술적 반복 버전을 테스트했습니다." },
  "subvert": { en: "Satirical plays often subvert traditional social hierarchies through comedy.", ko: "풍자극은 희곡적 코미디를 통해 전통적인 사회적 계급 구조를 전복시키고 뒤엎습니다." },
  "contemplation": { en: "Quiet contemplation allows thinkers to process complex philosophical ideas deeply.", ko: "조용한 사색과 명상은 사상가들이 복잡한 철학적 아이디어를 깊이 있게 처리할 수 있도록 돕습니다." },
  "convention": { en: "Modern artists broke away from classical convention to explore abstract styles.", ko: "현대 예술가들은 추상적인 양식을 탐구하기 위해 고전적 관습과 관례에서 벗어났습니다." },
  "soliloquy": { en: "The actor delivered a stirring soliloquy revealing his character's inner conflict.", ko: "배우는 등장인물의 내적 갈등을 드러내는 감동적인 독백을 연기했습니다." },
  "immerse": { en: "Language learners benefit when they fully immerse themselves in the foreign culture.", ko: "언어 학습자들은 외국 문화에 스스로를 완전히 몰입하게 할 때 큰 이점을 얻습니다." },
  "parallel": { en: "Historical analysts identified striking parallels between the two economic crises.", ko: "역사 분석가들은 두 경제 위기 사이의 놀라운 평행선과 유사성을 확인했습니다." },
  "absorption": { en: "Plant roots optimize nutrient absorption through extensive microscopic root hairs.", ko: "식물 뿌리는 방대한 미세 뿌리 털을 통해 영양분 흡수를 최적화합니다." },
  "sheer": { en: "The mountaineers conquered the peak through sheer determination and endurance.", ko: "산악인들은 순전한 의지와 인내심으로 정상에 올랐습니다." },
  "indistinct": { en: "Faint footprints in the mud were blurry and indistinct under the dim moonlight.", ko: "진흙 속 희미한 발자국은 어두운 달빛 아래 불분명하고 흐릿했습니다." },
  "reconcile": { en: "Diplomats worked to reconcile conflicting territorial claims between neighboring states.", ko: "외교관들은 이웃 국가 간의 상충하는 영토 주장을 조화시키고 양립하게 하기 위해 노력했습니다." },
  "disparate": { en: "The interdisciplinary research team integrated disparate data streams into a unified model.", ko: "학제 간 연구팀은 이질적이고 전혀 다른 데이터 스트림을 통합 모델로 결합했습니다." },
  "compensate": { en: "Employers offer higher wages to compensate workers for hazardous working conditions.", ko: "고용주들은 위험한 작업 환경에 대해 근로자들에게 보상하고 보완하기 위해 더 높은 임금을 제공합니다." },
  "imbue": { en: "The director aimed to imbue the historical film with emotional authenticity.", ko: "감독은 역사 영화에 감정적 진정성을 가득 불어넣는 것을 목표로 했습니다." },
  "epitaph": { en: "The carved epitaph honored the fallen soldier's brave sacrifice for his country.", ko: "조각된 비문과 묘비명은 조국을 위해 장렬히 전사한 군인의 희생을 기렸습니다." },
  "inscription": { en: "Historians deciphered the ancient Greek inscription found on the marble pedestal.", ko: "역사학자들은 대리석 받침대에서 발견된 고대 그리스 새겨진 글 비문을 해독했습니다." },
  "decipher": { en: "Linguists worked for decades to decipher the mysterious script of the ancient civilization.", ko: "언어학자들은 고대 문명의 신비로운 문자를 판독하고 해독하기 위해 수십 년간 작업했습니다." },
  "resonance": { en: "The orator's eloquent speech possessed deep emotional resonance for the audience.", ko: "웅변가의 유려한 연설은 청중에게 깊은 감정적 공명과 울림을 안겨주었습니다." },
  "accompaniment": { en: "The opera singer performed with orchestral accompaniment in the grand concert hall.", ko: "오페라 가수는 웅장한 콘서트 홀에서 오케스트라 반주에 맞춰 노래했습니다." },
  "mourn": { en: "Citizens gathered in silence to mourn the tragic loss of community members.", ko: "시민들은 비극적으로 세상을 떠난 주민들을 애도하고 슬퍼하기 위해 침묵 속에 모였습니다." },
  "methodological": { en: "The paper received praise for its sound methodological rigor in data sampling.", ko: "그 논문은 데이터 표집에 있어 건전한 방법론적 엄격성으로 찬사를 받았습니다." },
  "sovereign": { en: "The nation maintained its status as an independent, sovereign democratic republic.", ko: "그 나라는 독립적이고 주권이 있는 민주 공화국으로서의 지위를 유지했습니다." },
  "ethnicity": { en: "Demographic surveys track population diversity across categories of age and ethnicity.", ko: "인구 조사 연구는 연령 및 민족성 범주 전반에 걸쳐 인구 다양성을 추적합니다." },
  "vernacular": { en: "Literature began to be written in the regional vernacular rather than classical Latin.", ko: "문학은 고전 라틴어 대신 지역의 토착어 및 자국어로 쓰이기 시작했습니다." },
  "triad": { en: "The study focused on the cognitive triad of thoughts, feelings, and behavioral actions.", ko: "연구는 사고, 감정, 행동이라는 인지적 3개 한 세트 구조에 초점을 맞췄습니다." },
  "census": { en: "The government conducts a national census every decade to count citizens accurately.", ko: "정부는 시민의 수를 정확하게 파악하기 위해 10년마다 전국 인구 조사를 실시합니다." },
  "governable": { en: "Clear legal structures help keep expanding urban populations peaceful and governable.", ko: "명확한 법적 구조는 팽창하는 도시 인구를 평화롭고 통치할 수 있는 상태로 유지하는 데 기여합니다." },
  "disperse": { en: "Police officers advised the protesting crowd to disperse peacefully from the square.", ko: "경찰관들은 시위 군중에게 광장에서 평화롭게 흩어지고 분산할 것을 권고했습니다." },
  "challenge": { en: "Scientists frequently challenge existing paradigms when new empirical data emerges.", ko: "새로운 실증적 데이터가 등장할 때 과학자들은 기존 패러다임에 자주 이의를 제기합니다." },
  "sovereignty": { en: "The treaty explicitly protected the national sovereignty and territorial borders of the state.", ko: "조약은 국가의 영토 경계와 통치권, 주권을 명시적으로 보호했습니다." },
  "pervasive": { en: "Air pollution has become a pervasive environmental threat in industrial megacities.", ko: "공기 오염은 산업 대도시에서 널리 퍼진 만연한 환경 위협이 되었습니다." },
  "strife": { en: "Diplomatic intervention aimed to resolve ongoing civil strife in the war-torn region.", ko: "외교적 개입은 전쟁으로 피폐해진 지역의 지속적인 내전과 충돌 및 불화를 해결하는 것을 목표로 했습니다." },
  "ameliorate": { en: "Social welfare programs seek to ameliorate poverty and improve public healthcare access.", ko: "사회 복지 프로그램은 빈곤을 개선하고 공공 의료 접근성을 나아지게 하는 것을 모색합니다." },
  "populace": { en: "Public health officials educated the general populace on preventative hygiene measures.", ko: "공중보건 관리들은 일반 대중과 서민들에게 예방 위생 조치에 대해 교육했습니다." },
  "confront": { en: "Leaders must confront severe economic challenges with decisive and transparent policy.", ko: "지도자들은 단호하고 투명한 정책으로 심각한 경제적 난국에 맞서고 직면해야 합니다." },
  "permafrost": { en: "Thawing Arctic permafrost releases trapped greenhouse gases into the atmosphere.", ko: "녹고 있는 북극 영구 동토층은 갇혀 있던 온실가스를 대기 중으로 배출합니다." },
  "extraction": { en: "Mineral extraction industries must abide by environmental protection regulations.", ko: "광물 추출 및 채굴 산업은 환경 보호 규정을 준수해야 합니다." },
  "equilibrium": { en: "Ecosystems maintain delicate biological equilibrium through predator-prey relationships.", ko: "생태계는 포식자와 피식자 관계를 통해 미묘한 생물학적 평형과 균형을 유지합니다." },
  "thaw": { en: "Spring sunshine causes frozen mountain rivers to thaw and flow downstream.", ko: "봄 햇살은 얼어붙은 산의 강물을 녹게 하고 해동시켜 아래로 흐르게 합니다." },
  "jeopardize": { en: "Unchecked deforestation threatens to jeopardize the survival of rare rain-forest species.", ko: "무분별한 산림 파괴는 희귀 열대우림 종의 생존을 위태롭게 할 위험이 있습니다." },
  "pathogen": { en: "Modern diagnostics rapidly identify airborne viral pathogens to prevent epidemics.", ko: "현대 진단 기술은 전염병을 막기 위해 공기 중의 바이러스성 병원균 및 병원체를 빠르게 식별합니다." },
  "symmetry": { en: "Classical Greek architecture is celebrated for its perfect geometric symmetry.", ko: "고전 그리스 건축은 완벽한 지오메트릭 대칭과 균형미로 칭송받습니다." },
  "cataclysmic": { en: "The asteroid impact triggered cataclysmic climate disruptions that caused mass extinctions.", ko: "소행성 충돌은 대량 멸종을 초래한 대재앙의 기후 혼란을 유발했습니다." },
  "seismic": { en: "Seismic sensors detected subtle ground tremors preceding the volcanic eruption.", ko: "지진 감지 센서가 화산 폭발에 앞서 미세한 지반 진동을 감지했습니다." },
  "exact": { en: "Laboratory instruments must provide exact measurement readings for accurate analysis.", ko: "실험실 기기는 정확한 분석을 위해 명확하고 정확한 측정값을 제공해야 합니다." },
  "ignite": { en: "A spark from electrical wiring can easily ignite flammable chemical vapors.", ko: "전기 배선의 스파크는 가연성 화학 증기에 쉽게 불을 붙이고 점화시킬 수 있습니다." },
  "strike": { en: "Tectonic shifts can cause fault lines to strike forcefully against one another.", ko: "지각 변동은 단층선이 서로 강력하게 강타하고 부딪히게 할 수 있습니다." },
  "detonation": { en: "Demolition experts controlled the explosive detonation of the old concrete stadium.", ko: "해체 전문가들은 오래된 콘크리트 경기장의 폭발과 기폭을 통제했습니다." },
  "occurrence": { en: "Solar eclipses are rare natural occurrences that attract scientific study worldwide.", ko: "일식은 전 세계적인 과학적 연구를 이끄는 희귀한 자연적 사건이자 발생입니다." },
  "flammable": { en: "Safety labels warn workers to store flammable solvents away from heat sources.", ko: "안전 표지판은 작업자들에게 가연성 용매를 열원으로부터 떨어진 곳에 보관하라고 경고합니다." },
  "systematic": { en: "Researchers conducted a systematic review of existing medical literature.", ko: "연구진은 기존 의학 문헌에 대한 체계적이고 조직적인 검토를 진행했습니다." },
  "rudimentary": { en: "Early hominids crafted rudimentary stone tools for hunting and defense.", ko: "초기 인류는 사냥과 방어를 위해 초보적인 미발달의 석기를 제작했습니다." },
  "pendulum": { en: "The swinging pendulum of the clock demonstrated precise harmonic motion.", ko: "시계의 흔들리는 진자와 추는 정밀한 단조 운동을 보여주었습니다." },
  "discipline": { en: "Astrophysics is a challenging scientific discipline that combines physics and astronomy.", ko: "천체물리학은 물리학과 천문학을 결합한 도전적인 학문 분야입니다." },
  "horizontal": { en: "Stratified rock layers formed flat horizontal bands across the canyon walls.", ko: "층적 암석 층은 협곡 벽 전반에 걸쳐 평평한 수평 띠를 형성했습니다." },
  "tremor propagation": { en: "Geophysicists analyzed seismic tremor propagation to map deep underground fault structures.", ko: "지구물리학자들은 지하 깊은 단층 구조를 추적하기 위해 지진 진동의 전파를 분석했습니다." },
  "accretion": { en: "Planetary accretion occurs as cosmic dust clumps together under gravity.", ko: "행성의 강착 및 축적은 우주 먼지가 중력에 의해 함께 뭉치면서 일어납니다." },
  "collide": { en: "Subatomic particles collide inside particle accelerators at near light speed.", ko: "아원자 입자들은 입자 가속기 내부에서 광속에 가까운 속도로 충돌합니다." },
  "electrostatic": { en: "Dry atmospheric conditions increase electrostatic friction between synthetic fabrics.", ko: "건조한 대기 조건은 합성 섬유 간의 정전기 마찰을 증가시킵니다." },
  "solidify": { en: "Molten lava cools rapidly upon contacting ocean water to solidify into basalt rock.", ko: "용암은 바닷물에 닿으면 빠르게 식어 현무암 고체로 굳어집니다." },
  "volatile": { en: "Chemical storage requires keeping volatile liquids at cool ambient temperatures.", ko: "화학물질 보관 시에는 휘발성 액체를 서늘한 상온 상태로 유지해야 합니다." },
  "milestone": { en: "The successful launch of the space telescope marked a historical milestone.", ko: "우주 망원경의 성공적인 발사는 역사적인 중요한 이정표이자 획기적 사건이었습니다." },
  "efficiently": { en: "Modern solar panels convert sunlight into usable electricity far more efficiently.", ko: "현대 태양광 판은 햇빛을 훨씬 더 효율적으로 사용할 수 있는 전기로 전환합니다." },
  "lump": { en: "Geologists extracted a heavy lump of iron ore from the mining trench.", ko: "지질학자들은 채굴 도랑에서 무거운 철광석 덩어리를 추출했습니다." },
  "pose": { en: "Unregulated industrial runoff can pose severe ecological threats to river ecosystems.", ko: "단속되지 않은 산업 폐수는 강 생태계에 심각한 환경적 문제를 제기하고 일으킬 수 있습니다." },
  "embryonic": { en: "The start-up biotech firm is currently in its embryonic stage of research development.", ko: "그 바이오 벤처 기업은 현재 연구 개발의 초기의 발생 단계에 있습니다." },
  "planetesimal": { en: "Dust particles coalesced into planetesimal bodies during the early formation of the solar system.", ko: "태양계 초기 형성 시 우주 먼지 입자들은 미행성체 덩어리로 합쳐졌습니다." },
  "clump": { en: "Microscopic algae began to clump together on the surface of the pond.", ko: "미세 갈조류가 연못 표면 위에 함께 덩어리로 무리지어 모이기 시작했습니다." },
  "linger": { en: "Traces of volcanic ash can linger in the upper atmosphere for months.", ko: "화산재의 흔적은 상층 대기에 수개월 동안 머물고 남을 수 있습니다." },
  "dimension": { en: "Scientists measured the precise physical dimensions of the ancient megalith.", ko: "과학자들은 고대 거석의 정확한 물리적 크기와 차원을 측정했습니다." },
  "elucidate": { en: "The groundbreaking study helped elucidate the genetic mechanism behind cellular aging.", ko: "그 획기적인 연구는 세포 노화 뒤에 숨은 유전적 메커니즘을 명료하게 설명하고 밝히는 데 기여했습니다." },
  "circumvent": { en: "Researchers found a clever strategy to circumvent traditional experimental limitations.", ko: "연구진은 전통적인 실험적 한계를 우회하고 피할 수 있는 지혜로운 전략을 찾았습니다." },
  "cortical": { en: "Brain imaging scans measured cortical thickness in subjects undergoing cognitive training.", ko: "뇌 영상 스캔은 인지 훈련을 받는 피험자들의 대뇌 피질 두께를 측정했습니다." },
  "restorative": { en: "Deep sleep delivers restorative biological benefits essential for physical recovery.", ko: "깊은 수면은 신체 회복에 필수적인 회복시키는 생물학적 이점을 제공합니다." },
  "coastline": { en: "Rising sea levels threaten to erode vulnerable sandy coastlines around low-lying islands.", ko: "상승하는 해수면은 저지대 섬 주변의 취약한 모래 해안선을 침식시킬 위협을 가합니다." },
  "teem with": { en: "Coral reefs teem with thousands of colorful marine organisms and vibrant marine life.", ko: "산호초는 수천 가지의 화려한 해양 생물로 가득하고 바글거립니다." },
  "safeguard": { en: "Strict environmental regulations help safeguard natural habitats from industrial pollution.", ko: "엄격한 환경 규제는 산업 오염으로부터 자연 서식지를 보호하는 데 도움을 줍니다." },
  "stabilize": { en: "Medical intervention helped stabilize the critically injured patient's vital signs.", ko: "의료진의 개입은 위중한 부상 환자의 생체 징후를 안정화하는 데 기여했습니다." },
  "suspend": { en: "Authorities decided to suspend construction work pending further environmental impact studies.", ko: "당국은 추가적인 환경 영향 평가 조사를 기다리는 동안 건설 작업을 중단하고 유예하기로 했습니다." },
  "complementary receptor": { en: "Immune cells utilize a complementary receptor to bind specific viral antigens.", ko: "면역 세포는 특정 바이러스 항원과 결합하기 위해 상호 보완적인 수용체를 활용합니다." },
  "receptor": { en: "Cellular receptors detect hormonal signals and trigger internal biochemical responses.", ko: "세포 수용체는 호르몬 신호를 감지하고 내부 생화학적 반응을 개시합니다." },
  "initiate": { en: "Enzyme binding initiates the complex cascade of metabolic energy synthesis.", ko: "효소 결합은 대사 에너지 합성의 복잡한 연쇄 반응을 시작하고 개시합니다." },
  "secretion": { en: "Endocrine glands control the precise internal secretion of metabolic regulatory hormones.", ko: "내분비선은 대사 조절 호르몬의 정밀한 체내 분비를 조절합니다." },
  "homeostasis": { en: "The human body maintains internal homeostasis through autonomic biological feedback loops.", ko: "인간의 몸은 자율 생물학적 피드백 고리를 통해 체내 항상성을 유지합니다." },
  "indispensable": { en: "Water is an indispensable requirement for the survival of all known living organisms.", ko: "물은 알려진 모든 생물체의 생존에 없어서는 안 될 필수적인 요소입니다." },
  "fiercely": { en: "Territorial animals fiercely defend their nesting areas against potential rivals.", ko: "텃세를 부리는 동물들은 잠재적 경쟁자에 맞서 자신의 둥지 구역을 사납게 맹렬히 방어합니다." },
  "aerial attack": { en: "Predatory hawks execute a swift aerial attack to capture prey in open fields.", ko: "맹금류 매는 탁 트인 들판에서 먹이를 포획하기 위해 신속한 공중 공격을 감행합니다." },
  "repel": { en: "Plant chemical secretions serve to repel destructive herbivorous insects.", ko: "식물의 화학 분비물은 파괴적인 식물성 곤충을 격퇴하고 쫓아버리는 역할을 합니다." },
  "intruder": { en: "Guard dogs barked loudly upon sensing an unauthorized intruder near the perimeter.", ko: "경비견들은 경계 근처에서 무단 침입자를 감지하자 크게 짖었습니다." },
  "submerge": { en: "Heavy monsoons can submerge low-lying agricultural fields under meters of water.", ko: "강력한 몬순 폭우는 저지대 농경지를 수 미터 깊이의 물로 침수시키고 물에 잠기게 할 수 있습니다." },
  "prone to": { en: "Coastal regions are particularly prone to severe flooding during hurricane season.", ko: "해안 지역은 특히 허리케인 계절 동안 심각한 홍수를 겪기 쉬운 경향이 있습니다." },
  "hydrogen sulfide": { en: "Deep oceanic vents emit toxic hydrogen sulfide gas supporting specialized chemosynthetic bacteria.", ko: "심해 열수구는 특수 화학합성 세균을 지탱하는 유독한 황화수소 가스를 배출합니다." },
  "hydrothermal vent": { en: "Scientists discovered unique marine ecosystems flourishing around deep-sea hydrothermal vents.", ko: "과학자들은 심해 열수구 주변에서 번성하는 독특한 해양 생태계를 발견했습니다." },
  "habitable": { en: "Astronomers search distant stellar systems for potentially habitable Earth-like planets.", ko: "천문학자들은 거주할 수 있고 생존 가능한 외계 지구형 행성을 찾기 위해 먼 별계를 탐색합니다." },
  "sustenance": { en: "Photosynthetic algae provide primary sustenance for microscopic marine zooplankton.", ko: "광합성 갈조류는 미세 해양 동물플랑크톤에게 주요 자양물과 영양을 제공합니다." },
  "nourishment": { en: "Rich volcanic soil delivers vital mineral nourishment to growing agricultural crops.", ko: "풍부한 화산 토양은 자라나는 농작물에 필수적인 광물 자양분을 제공합니다." },
  "extraterrestrial": { en: "Radio telescopes scan space for candidate signals that might suggest extraterrestrial intelligence.", ko: "전파 망원경은 외계 지적 생명체의 가능성을 시사하는 후보 신호를 찾기 위해 우주를 스캔합니다." },
  "whereas": { en: "Mammals regulate their body temperature internally, whereas reptiles rely on external heat.", ko: "포유류는 체온을 내적으로 조절하는 반면에, 파충류는 외부 열원에 의존합니다." },
  "feasibility": { en: "Engineers conducted a thorough study to evaluate the economic feasibility of the solar project.", ko: "엔지니어들은 태양광 프로젝트의 경제적 실현 가능성을 평가하기 위해 철저한 조사를 진행했습니다." },
  "judicious": { en: "A judicious allocation of research funds ensures maximum scientific output.", ko: "연구 자금의 현명하고 신중한 배분은 최대의 과학적 성과를 보장합니다." },
  "aspirational": { en: "The environmental target set by the international summit was ambitious and aspirational.", ko: "국제 정상회의에서 설정된 환경 목표는 야심 차고 열망적인 포부를 담고 있었습니다." },
  "aspect": { en: "Researchers analyzed every physical aspect of the ancient archeological artifact.", ko: "연구진은 고대 고고학 유물의 모든 물리적 측면과 양상을 분석했습니다." },
  "juxtapose": { en: "Curators chose to juxtapose classical oil paintings with modern abstract sculptures.", ko: "큐레이터들은 고전 유화 작품과 현대 추상 조각을 나란히 병치하여 전시하기로 했습니다." },
  "resilience": { en: "Coastal mangrove forests demonstrate remarkable ecological resilience against ocean storms.", ko: "해안 맹그로브 숲은 해양 폭풍에 맞서 탁월한 생태적 회복력과 탄력성을 보여줍니다." },
  "pivotal": { en: "The historical treaty played a pivotal role in establishing long-term regional peace.", ko: "그 역사적 조약은 장기적인 지역 평화를 구축하는 데 결정적인 역할을 했다." },
  "comprehencing": { en: "Active engagement with complex academic texts is key to comprehending deep concepts.", ko: "복잡한 학술 지문에 대한 능동적 참여는 깊이 있는 개념을 이해하는 데 핵심이다." },
  "comprehending": { en: "Active engagement with complex academic texts is key to comprehending deep concepts.", ko: "복잡한 학술 지문에 대한 능동적 참여는 깊이 있는 개념을 이해하는 데 핵심이다." },
  "property": { en: "Water possesses unique chemical properties, including high heat capacity and surface tension.", ko: "물은 높은 비열과 표면장력을 포함하여 독특한 화학적 속성을 지니고 있다." },
  "consolidation": { en: "Sleep plays a vital role in memory consolidation, transforming short-term experiences into long-term storage.", ko: "수면은 단기 경험을 장기 기억으로 전환하며 기억의 통합과 강화에 중요한 역할을 한다." },
  "impair": { en: "Chronic sleep deprivation can severely impair cognitive function and decision-making performance.", ko: "만성적인 수면 부족은 인지 기능과 의사결정 능력을 심각하게 저해할 수 있다." },
  "queries": { en: "The database efficiently processed thousands of search queries per second.", ko: "그 데이터베이스는 초당 수천 건의 검색 질문 및 요청을 효율적으로 처리했다." },
  "rejuvenate": { en: "Urban renewal projects can rejuvenate stagnant local economies and public spaces.", ko: "도시 재개발 프로젝트는 정체된 지역 경제와 공공장소에 다시 활력을 되찾아줄 수 있다." },
  "arteries": { en: "Arteries deliver oxygenated blood from the heart to tissues throughout the body.", ko: "동맥은 산소화된 혈액을 심장에서 전신의 조직으로 전달한다." },
  "ripple": { en: "The economic policy change created a ripple effect across multiple global industries.", ko: "그 경제 정책의 변화는 여러 글로벌 산업 전반에 파문과 파장 효과를 일으켰다." },
  "erratic": { en: "Erratic weather patterns caused by climate change disrupt agricultural harvest cycles.", ko: "기후 변화로 인한 불규칙한 날씨 패턴은 농업 수확 주기를 교란한다." },
  "initiative": { en: "The research team took the initiative to launch a comprehensive environmental study.", ko: "연구진은 종합적인 환경 연구를 시작하기 위해 주도권을 잡고 솔선수범했다." },
  "suspense": { en: "The film built intense suspense by gradually revealing clues behind the mystery.", ko: "그 영화는 미스터리 뒤의 단서들을 서서히 드러냄으로써 강렬한 긴장감을 조성했다." },
  "workforce": { en: "Rapid technological automation requires continuous retraining of the modern workforce.", ko: "급격한 기술 자동화는 현대 노동력 및 인력의 지속적인 재교육을 요구한다." },
  "tendril": { en: "The climbing plant attached itself securely to the wooden trellis using delicate green tendrils.", ko: "덩굴식물은 섬세한 초록색 덩굴손을 사용하여 나무 격자대에 안착했다." },
  "contingent": { en: "The success of the polar expedition is contingent upon favorable atmospheric and ice conditions.", ko: "극지 탐험의 성공은 우호적인 대기와 빙하 조건에 달려 있다." },
  "startle": { en: "The sudden ultrasonic signal in the nocturnal forest served to startle roosting bird species.", ko: "야간 숲속의 갑작스러운 초음파 신호는 둥지를 튼 조류 종을 깜짝 놀라게 했다." },
  "corridor": { en: "Migratory wildlife species rely on a continuous ecological corridor to navigate safely across fragmented habitats.", ko: "이동성 야생동물 종은 파편화된 서식지를 안전하게 이동하기 위해 연속적인 생태 통로에 의존한다." },
  "precipitation": { en: "Heavy atmospheric precipitation during the monsoon season replenished depleted regional groundwater supplies.", ko: "장마철 동안의 집중 대기 강수량은 고갈되었던 지역 지하수 공급을 충원했다." },
  "preciptation": { en: "Heavy atmospheric precipitation during the monsoon season replenished depleted regional groundwater supplies.", ko: "장마철 동안의 집중 대기 강수량은 고갈되었던 지역 지하수 공급을 충원했다." },
  "reservoirs": { en: "Artificial reservoirs store immense volumes of fresh water required for agricultural irrigation and municipal power.", ko: "인공 저수지는 농업용 용수와 시 도시 전력에 필요한 막대한 양의 담수를 저장한다." },
  "poleward": { en: "Oceanic thermal currents flow poleward, transporting tropical warmth toward subpolar atmospheric regions.", ko: "해양 열류는 극지 방향으로 흐르며 열대 지방의 온기를 아극지 대기 영역으로 운반한다." },
  "condense": { en: "Warm water vapor begins to condense into liquid cloud droplets upon reaching higher atmospheric altitudes.", ko: "따뜻한 수증기는 더 높은 대기 고도에 도달하면 액체 구름 물방울로 응축하기 시작한다." },
  "discharge": { en: "Environmental laws strictly regulate the volume of chemical waste industrial facilities may discharge into rivers.", ko: "환경 법률은 산업 시설이 강으로 방출할 수 있는 화학 폐기물의 양을 엄격하게 규제한다." },
  "altitude": { en: "Atmospheric pressure and oxygen concentration decrease significantly as elevation reaches a high altitude.", ko: "고도가 높은 지점에 이름에 따라 대기압과 산소 농도가 현저히 감소한다." },
  "cohesion": { en: "Social cohesion within a community strengthens its ability to recover from severe economic crises.", ko: "공동체 내부의 사회적 응집력은 심각한 경제 위기로부터 회복하는 능력을 강화한다." },
  "incise": { en: "Ancient artisans used sharp bronze tools to incise intricate geometric patterns into stone tablets.", ko: "고대 장인들은 석판에 정교한 기하학적 문양을 조각해 새기기 위해 날카로운 청동 도구를 사용했다." },
  "accomodate": { en: "The newly expanded lecture hall can comfortably accommodate over five hundred university students.", ko: "새로 확장된 강의실은 500명 이상의 대학생을 편안하게 수용할 수 있다." },
  "accommodate": { en: "The newly expanded lecture hall can comfortably accommodate over five hundred university students.", ko: "새로 확장된 강의실은 500명 이상의 대학생을 편안하게 수용할 수 있다." },
  "decent": { en: "Access to decent housing and clean water is essential for public health in developing cities.", ko: "품위 있고 적절한 주거 환경과 깨끗한 물에 대한 접근성은 발전 중인 도시의 공중보건에 필수적이다." },
  "pledge": { en: "Participating nations signed a formal pledge to reduce industrial carbon emissions by half.", ko: "참여국들은 산업 탄소 배출량을 절반으로 줄이겠다는 공식 약속(서약)에 서명했다." },
  "commitment": { en: "Long-term scientific breakthroughs require a sustained financial commitment from research institutions.", ko: "장기적인 과학적 돌파구를 마련하려면 연구 기관의 지속적인 재정적 약속과 헌신이 필요하다." },
  "urge": { en: "Environmental scientists urge policymakers to protect endangered coastal wetland habitats.", ko: "환경 과학자들은 정책 입안자들에게 멸종 위기에 처한 해안 습지 서식지를 보호할 것을 촉구한다." },
  "bison": { en: "Vast herds of American bison once roamed freely across the North American grasslands.", ko: "거대한 아메리카 들소 무리가 한때 북미 초원 지대를 자유롭게 누볐다." },
  "herd": { en: "Migratory herbivores travel in a large herd to protect vulnerable offspring from predators.", ko: "이동성 초식동물들은 포식자로부터 취약한 새끼들을 보호하기 위해 큰 떼(무리)를 지어 이동한다." },
  "shrub": { en: "Drought-resistant desert shrubs have deep root systems that absorb scarce underground moisture.", ko: "가뭄에 강한 사막 관목들은 희소한 지하 수분을 흡수하는 깊은 뿌리 체계를 가지고 있다." },
  "upfront": { en: "Renewable energy projects often require substantial upfront capital investment before generating returns.", ko: "재생 에너지 프로젝트는 수익을 창출하기 전에 흔히 상당한 사전(미리 지불하는) 자본 투자를 필요로 한다." },
  "reluctant": { en: "Many traditional industries were initially reluctant to adopt automated manufacturing technologies.", ko: "많은 전통 산업들은 초기에 자동화 제조 기술을 도입하는 것을 주저했다." },
  "fragmentation": { en: "Forest fragmentation caused by highway construction severely threatens wildlife biodiversity.", ko: "고속도로 건설로 인한 산림의 분열(단편화)은 야생동물의 생물다양성을 심각하게 위협한다." },
  "interfere": { en: "Artificial electromagnetic signals can interfere with the natural navigation systems of migratory birds.", ko: "인공 전자기 신호는 철새들의 자연 항법 체계를 방해하고 간섭할 수 있다." },
  "disobey": { en: "Citizens who peacefully disobey unjust laws often spark significant constitutional reforms.", ko: "부당한 법률에 평화적으로 불복종하는 시민들은 종종 중대한 헌법 개혁을 촉발한다." },
  "dispense": { en: "Hospital pharmacies strictly verify medical prescriptions before they dispense medication to patients.", ko: "병원 약국은 환자에게 약을 나누어 주고 배포하기 전에 처방전을 엄격히 확인한다." },
  "constraint": { en: "Limited freshwater availability remains the primary ecological constraint on agricultural expansion.", ko: "제한된 담수 가용성은 농업 확장에 있어 주요한 생태학적 제약으로 남아 있다." },
  "reputation": { en: "The research institute earned an international reputation for its pioneering work in molecular genetics.", ko: "그 연구소는 분자유전학 분야의 선구적인 업적으로 세계적인 명성을 얻었다." },
  "nomadic": { en: "Nomadic pastoralists move their livestock seasonally in search of fertile grazing pastures.", ko: "유목 생활을 하는 목축민들은 비옥한 방목 초지를 찾아 계절에 따라 가축을 이동시킨다." },
  "compulsory": { en: "The introduction of compulsory primary education dramatically increased national literacy rates.", ko: "의무적인 초등 교육의 도입은 국가 문해율을 획기적으로 높였다." },
  "furnishing": { en: "Archaeologists recovered finely carved wooden furnishings from the ancient royal chamber.", ko: "고고학자들은 고대 왕실 방에서 정교하게 조각된 목제 가구와 비품들을 발굴했다." },
  "artisanal": { en: "Before mechanized factories emerged, textiles were produced through small-scale artisanal craftsmanship.", ko: "기계화된 공장이 등장하기 전에 직물은 소규모 장인의 수공예 기술을 통해 생산되었다." },
  "manifestation": { en: "Melting glaciers are a visible physical manifestation of accelerating global climate change.", ko: "녹아내리는 빙하는 가속화되는 지구 기후 변화의 눈에 보이는 물리적 표명(징후)이다." },
  "vitality": { en: "Bustling local markets and cultural festivals reflect the economic vitality of the historic port city.", ko: "번창하는 지역 시장과 문화 축제는 그 역사적인 항구 도시의 경제적 활력을 반영한다." },
  "medieval": { en: "Medieval European cathedrals were constructed with flying buttresses to support high stone vaults.", ko: "중세 유럽의 대성당들은 높은 석조 아치 천장을 지탱하기 위해 플라잉 버트레스 구조로 건축되었다." },
  "constitute": { en: "Diatoms and other microscopic algae constitute the foundational base of marine food webs.", ko: "규조류와 기타 미세 조류는 해양 먹이 그물의 기초 토대를 구성한다." },
  "peasantry": { en: "Heavy taxation imposed on the rural peasantry contributed to widespread agrarian unrest.", ko: "농촌 소작농 계층에 부과된 과중한 세금은 광범위한 농민 소요 사태의 원인이 되었다." },
  "landless": { en: "Agrarian reforms aimed to distribute small plots of farmland to landless rural laborers.", ko: "토지 개혁은 토지가 없는 농촌 노동자들에게 소규모 농지를 분배하는 것을 목표로 했다." },
  "borough": { en: "Each metropolitan borough maintains its own local library system and municipal public parks.", ko: "각 대도시 자치구는 자체적인 지역 도서관 시스템과 시립 공원을 운영한다." },
  "fortification": { en: "Coastal cities built massive stone fortifications to defend their harbors against naval sieges.", ko: "해안 도시들은 해상 포위 공격으로부터 항구를 방어하기 위해 거대한 석조 요새(강화 시설)를 건설했다." },
  "erect": { en: "Ancient civilizations managed to erect monumental stone temples without modern lifting machinery.", ko: "고대 문명은 현대적인 기중기 기계 없이도 거대한 석조 사원을 세울 수 있었다." },
  "famine": { en: "Crop failures triggered by consecutive years of severe drought led to a devastating regional famine.", ko: "수년간 이어진 극심한 가뭄으로 인한 흉작은 파괴적인 지역 기근을 초래했다." },
  "descend": { en: "Deep-sea submersibles descend thousands of meters into oceanic trenches to study marine life.", ko: "심해 잠수정은 해양 생물을 연구하기 위해 해구 속으로 수천 미터를 하강한다." },
  "spring up": { en: "Boomtowns began to spring up rapidly along the newly completed transcontinental railroad.", ko: "새로 완공된 대륙 횡단 철도를 따라 신흥 도시들이 빠르게 솟아오르듯 생겨나기 시작했다." },
  "validity": { en: "Independent scientists replicated the experiment to verify the statistical validity of the findings.", ko: "독립적인 과학자들은 연구 결과의 통계적 타당성과 효력을 검증하기 위해 실험을 재현했다." },
  "monastery": { en: "During the Middle Ages, scribes in remote monasteries preserved classical Greek and Roman texts.", ko: "중세 시대 동안 외딴 수도원의 필경사들은 고전 그리스와 로마 문헌들을 보존했다." },
  "fort": { en: "The frontier fort was strategically positioned on a high bluff overlooking the river valley.", ko: "그 변경 요새는 강 계곡이 내려다보이는 높은 절벽 위에 전략적으로 자리 잡고 있었다." },
  "correlate": { en: "Paleoclimatologists correlate ice core gas bubbles with historical atmospheric temperature shifts.", ko: "고기후학자들은 빙하 코어의 기포를 과거 대기 온도 변화와 서로 상관시켜 분석한다." },
  "susceptibility": { en: "Genetic monoculture in crops increases their susceptibility to widespread fungal diseases.", ko: "농작물의 유전적 단일 경작은 광범위한 곰팡이 질병에 대한 감수성(영향을 받기 쉬움)을 높인다." },
  "unduly": { en: "Researchers must ensure that small sample sizes do not unduly influence statistical conclusions.", ko: "연구자들은 작은 표본 크기가 통계적 결론에 부당하게(과도하게) 영향을 미치지 않도록 해야 한다." },
  "eligibility": { en: "Academic performance and financial need determine a student's eligibility for the research fellowship.", ko: "학업 성취도와 재정적 필요성이 연구 장학금에 대한 학생의 적격성(자격)을 결정한다." },
  "fascination": { en: "Humanity's enduring fascination with Mars has driven decades of robotic space exploration.", ko: "화성에 대한 인류의 지속적인 매혹(강한 호기심)은 수십 년간의 로봇 우주 탐사를 이끌어 왔다." },
  "repellent": { en: "Certain tropical plants secrete natural chemical compounds that act as an effective insect repellent.", ko: "특정 열대 식물들은 곤충이 싫어하는 효과적인 기피제 역할을 하는 천연 화학 물질을 분비한다." },
  "stencil": { en: "Prehistoric cave artists blew mineral pigments over their hands to create stencil outlines on rock walls.", ko: "선사 시대 동굴 예술가들은 암벽에 원판(스텐실) 윤곽을 만들기 위해 손 위에 광물 안료를 불어 넣었다." },
  "occasion": { en: "The royal coronation served as a ceremonial occasion to display the empire's artistic wealth.", ko: "왕실 대관식은 제국의 예술적 부를 과시하는 의례적 행사이자 기회 역할을 했다." },
  "nip": { en: "Crabs use their powerful front claws to nip predators and crush hard mollusk shells.", ko: "게는 포식자를 꼬집고 단단한 연체동물 껍데기를 부수기 위해 강력한 앞 집게발을 사용한다." },
  "encroach": { en: "Expanding suburban developments continue to encroach upon surrounding agricultural farmlands.", ko: "확장되는 교외 개발 단지는 주변 농경지를 계속해서 침범하고 잠식하고 있다." },
  "confrontation": { en: "Diplomatic negotiations successfully prevented a direct military confrontation between the two superpowers.", ko: "외교적 협상은 두 초강대국 간의 직접적인 군사적 직면(대립)을 성공적으로 방지했다." },
  "captive": { en: "Conservationists established a captive breeding program to save the critically endangered condor.", ko: "환경 보호 활동가들은 심각한 멸종 위기에 처한 콘도르를 구하기 위해 포획(사육) 번식 프로그램을 구축했다." },
  "eject": { en: "Active volcanoes can violently eject massive clouds of ash and sulfur dioxide into the stratosphere.", ko: "활화산은 성층권으로 거대한 화산재와 이산화황 구름을 격렬하게 방출(분출)할 수 있다." },
  "circulate": { en: "Oceanic currents circulate warm tropical water toward polar latitudes, regulating global climate.", ko: "해류는 따뜻한 열대 해수를 극지방 위도로 순환시켜 돌림으로써 지구 기후를 조절한다." },
  "division": { en: "The specialization of crafts in ancient cities led to an increasingly complex division of labor.", ko: "고대 도시에서 수공예의 전문화는 점차 복잡한 노동의 분할(분업)로 이어졌다." },
  "polarization": { en: "Algorithmic news feeds have contributed to growing political polarization in modern democracies.", ko: "알고리즘 기반 뉴스 피드는 현대 민주주의 사회에서 심화되는 정치적 양극화에 일조했다." },
  "cohort": { en: "Epidemiologists tracked a cohort of ten thousand adults over twenty years to study cardiovascular health.", ko: "역학자들은 심혈관 건강을 연구하기 위해 20년에 걸쳐 성인 1만 명의 동질 집단(코호트)을 추적 조사했다." },
  "surveillance": { meaning: "감시", en: "Public health agencies rely on continuous epidemiological surveillance to detect emerging viral outbreaks.", ko: "공중보건 기관들은 신종 바이러스 발발을 감지하기 위해 지속적인 역학 감시 체계에 의존한다." },
  "empirical": { meaning: "경험적인 / 실증적인", en: "Scientific hypotheses must be tested against rigorous empirical data gathered through observation.", ko: "과학적 가설은 관찰을 통해 수집된 엄격한 경험적(실증적) 데이터에 비추어 검증되어야 한다." },
  "immersion": { meaning: "몰입", en: "Full cultural immersion accelerates second-language acquisition far more effectively than classroom study alone.", ko: "완전한 문화적 몰입은 교실 수업만 하는 것보다 훨씬 더 효과적으로 제2언어 습득을 가속화한다." },
  "pragmatic": { meaning: "실용적인", en: "City planners adopted a pragmatic approach that balanced historic preservation with modern transit needs.", ko: "도시 계획가들은 역사 보존과 현대 교통 수요 사이의 균형을 맞추는 실용적인 접근법을 채택했다." },
  "generational": { meaning: "세대 간의", en: "Sociologists study how rapid technological change creates generational shifts in workplace values.", ko: "사회학자들은 급격한 기술 변화가 직장 가치관에 어떻게 세대 간의 변화를 만들어내는지 연구한다." },
  "precarity": { meaning: "불안정 / 불안정성", en: "The rise of temporary contract work has increased economic precarity among young urban professionals.", ko: "단기 계약직의 증가는 젊은 도시 직장인들 사이에서 경제적 불안정을 높였다." },
  "ubiquitous": { meaning: "어디에나 있는 / 흔한", en: "Microplastics have become ubiquitous in marine environments, appearing even in deep oceanic trenches.", ko: "미세플라스틱은 심해 해구에서조차 발견될 만큼 해양 환경에서 어디에나 존재하는 흔한 물질이 되었다." },
  "ephemeral": { meaning: "일시적인 / 덧없는", en: "Desert wildflowers bloom in ephemeral carpets of color that vanish within a few weeks of rainfall.", ko: "사막 야생화는 강우 후 몇 주 안에 사라지는 일시적이고 덧없는 색채의 융단처럼 피어난다." },
  "abundant": { meaning: "풍부한", en: "Regions with abundant seasonal rainfall and fertile volcanic soil supported dense agricultural populations.", ko: "풍부한 계절성 강우와 비옥한 화산 토양을 갖춘 지역은 조밀한 농업 인구를 부양했다." },
  "ambiguous": { meaning: "모호한 / 애매한", en: "Because the ancient inscription was worn and ambiguous, historians debated its exact meaning for decades.", ko: "고대 비문이 마모되어 모호했기 때문에 역사학자들은 수십 년간 그 정확한 의미를 두고 논쟁했다." },
  "manipulate": { meaning: "조작하다 / 다루다", en: "Researchers can manipulate temperature and humidity levels inside the laboratory chamber to simulate desert climates.", ko: "연구자들은 사막 기후를 모의실험하기 위해 실험실 챔버 내부의 온도와 습도 수준을 조작하고 조절할 수 있다." },
  "fluctuate": { meaning: "변동하다 / 오르내리다", en: "Desert temperatures fluctuate dramatically between scorching daytime heat and freezing nighttime cold.", ko: "사막 기온은 타는 듯한 낮의 열기와 얼어붙는 밤의 추위 사이에서 극적으로 변동한다." },
  "exacerbate": { meaning: "악화시키다", en: "Prolonged coastal deforestation can exacerbate soil erosion and increase the severity of seasonal flooding.", ko: "장기간의 해안 산림 벌채는 토양 침식을 악화시키고 계절성 홍수의 심각성을 높일 수 있다." },
  "proliferate": { meaning: "급증하다 / 증식하다", en: "Warm nutrient-rich waters allow microscopic algae to proliferate rapidly across coastal bays.", ko: "따뜻하고 영양분이 풍부한 해수는 미세 조류가 해안 만 전역에서 빠르게 증식하도록 만든다." },
  "corroborate": { meaning: "확증하다 / 뒷받침하다", en: "Geological sediment cores corroborate historical accounts of a massive volcanic eruption in the region.", ko: "지질학적 퇴적물 코어는 그 지역에서 일어났던 거대한 화산 폭발의 역사적 기록을 뒷받침(확증)한다." },
  "substantiate": { meaning: "입증하다 / 구체화하다", en: "Archaeologists discovered bronze tools that substantiate the theory of early trade networks.", ko: "고고학자들은 초기 무역망 이론을 입증하는 청동 도구들을 발견했다." },
  "stipulate": { meaning: "규정하다 / 명기하다", en: "International conservation treaties stipulate strict limits on commercial fishing in protected marine zones.", ko: "국제 환경 보전 조약은 보호 해양 구역 내 상업적 어획에 대한 엄격한 제한을 규정한다." },
  "culminate": { meaning: "절정에 달하다 / ~로 끝나다", en: "Decades of diplomatic tension eventually culminated in the signing of a comprehensive peace accord.", ko: "수십 년간의 외교적 긴장은 마침내 포괄적인 평화 협정 체결로 귀결되었다." },
  "scrutinize": { meaning: "면밀히 조사하다", en: "Peer reviewers carefully scrutinize experimental methodology before approving scientific manuscripts.", ko: "동료 평가자들은 과학 논문을 승인하기 전에 실험 방법론을 면밀히 조사한다." },
  "relinquish": { meaning: "포기하다 / 양도하다", en: "Following the treaty, the monarch was forced to relinquish absolute control over taxation.", ko: "조약 체결 이후 군주는 과세에 대한 절대적 통제권을 포기(양도)해야 했다." },
  "replenish": { meaning: "보충하다 / 다시 채우다", en: "Annual river flooding helped replenish essential soil nutrients across the ancient floodplain.", ko: "매년 발생하는 강물의 범람은 고대 범람원 전역에 필수 토양 영양분을 보충하는 데 도움을 주었다." },
  "diminish": { meaning: "줄어들다 / 감소시키다", en: "Habitat loss continues to diminish the genetic diversity of isolated wildlife populations.", ko: "서식지 손실은 고립된 야생동물 개체군의 유전적 다양성을 계속해서 감소시킨다." },
  "undermine": { meaning: "약화시키다 / 훼손하다", en: "Persistent inflation can undermine consumer confidence and slow long-term economic growth.", ko: "지속적인 인플레이션은 소비자 신뢰를 약화시키고 장기적인 경제 성장을 둔화시킬 수 있다." }
};

// --- Application State ---
const state = {
  words: [],           // Master array of word objects
  allCardStack: [],    // Unmemorized cards remaining in Tab 1 (Shuffled)
  favCardStack: [],    // Stack of words remaining in Tab 2 Card View
  favorites: new Set(),// Set of favorited word IDs
  knownWords: new Set(),// Set of "Know" (알아요) word IDs
  swipeHistory: [],    // Undo stack for swiped cards
  currentTab: 'tabAll',// 'tabAll' | 'tabFav' | 'tabAdd'
  allViewMode: 'card', // 'card' | 'list'
  favViewMode: 'list', // 'list' | 'card'
  searchAllQuery: '',
  searchFavQuery: '',
  stats: { know: 0, review: 0 },
  isCloudSynced: false,
  editingWordId: null, // ID of word currently being edited in modal
  isSwipingCard: false,
  swipeTimeoutId: null
};

// LocalStorage Keys
const STORAGE_KEY_FAVS = 'voca_app_favorites_v1';
const STORAGE_KEY_KNOWN = 'voca_app_known_words_v1';
const STORAGE_KEY_ADDED = 'voca_app_custom_words_v1';
const STORAGE_KEY_EDITED = 'voca_app_edited_words_v2';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  initClock();
  loadSavedState();
  await initCloudDB();
  await fetchAndParseCSV();
  bindEvents();
  bindEditModalEvents();
  bindKeyboardShortcuts();
});

// Real-time Clock for iOS Status Bar
function initClock() {
  const clockEl = document.getElementById('clockTime');
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// Fisher-Yates Random Shuffle
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const GENERIC_TEMPLATE_PATTERNS = [
  'In academic contexts,',
  'refers to (',
  'The study examines the role of',
  'Understanding the concept of',
  'Understanding the fundamental principles of',
  'Recent academic research highlights how',
  'Scholars have identified',
  'Experimental evidence demonstrates the significance of',
  'Comprehensive empirical studies indicate that',
  'Contemporary investigators continue to examine how',
  'A thorough investigation into',
  'Lukas was decently drunk',
  'The general took pledges',
  'Yanni controlled that urge',
  'James needs to face it upfront',
  'Reluctantly, Miroslav agreed',
  'Stefan tried to interfere',
  'The soap dispenser is electronic',
  'Creativity loves constraints',
  'Kabyle weaving, Marabout reputation',
  'Algeria has nomadic tribes',
  'Attendance is compulsory',
  'Sami was furnishing his bedroom',
  'It is a manifestation of her expectations',
  'Algiers is full of vitality',
  'These conditions are medieval',
  'What constitutes "hate speech"',
  "That's quite an erection",
  'Is famine looming for Morocco',
  'The night descended gradually',
  'Tom was at the monastery',
  'When was this fort built',
  'Probably I was unduly straight',
  'Is that insect repellent',
  'I used a stencil to make this',
  'Weddings are special occasions',
  'Nip over there and ask',
  'Santiago took Rima captive',
  'Rodrigo ejected from the plane',
  'The meeting minutes were circulated',
  'Two divisions have surrendered',
  "Surprise, surprise: it's Tom",
  'We installed surveillance cameras',
  'I took an immersion course',
  'Tom was much more pragmatic'
];

function isGenericTemplateSentence(sentence) {
  if (!sentence || !sentence.trim()) return true;
  return GENERIC_TEMPLATE_PATTERNS.some(pattern => sentence.includes(pattern));
}

function isGenericTemplateTranslation(translation, word) {
  if (!translation || !translation.trim()) return true;
  if (translation.includes('학문적 맥락에서')) return true;
  if (translation.includes('주요 학술 단어')) return true;
  if (translation.includes('이 연구는 현대 학술 연구에서')) return true;
  if (word && translation.toLowerCase().includes(`${word.toLowerCase().trim()} (`)) return true;
  return false;
}

function isHighQualityAcademicSentence(sentence, word) {
  if (!sentence) return false;
  const s = sentence.trim();
  if (s.length < 35 || s.length > 165) return false;
  if (!/^[A-Z]/.test(s) || !/[.]$/.test(s)) return false;
  if (/[?!"]/.test(s)) return false;
  if (isGenericTemplateSentence(s)) return false;
  if (/\b(I|me|my|mine|you|your|we|us|our|let's|don't|didn't|won't|can't|isn't|aren't|wasn't|weren't|Tom|Mary|Sami|Miroslav|Lukas|Yanni|Rodrigo|Santiago|John|Alice|Bob)\b/.test(s)) {
    return false;
  }
  if (/\b(thou|thee|thy|thine|hath|shalt|dost|unto|drunk|erection|sex|sexy|beer|wine|whiskey)\b/i.test(s)) {
    return false;
  }
  const clean = (word || '').toLowerCase().trim();
  if (clean) {
    const stem = clean.replace(/(ing|ed|es|s|ly|tion|ment|ity)$/i, '');
    const matchTarget = stem.length >= 4 ? stem : clean;
    const regex = new RegExp(`\\b${matchTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    if (!regex.test(s)) return false;
  }
  return true;
}

function composeContextualToeflSentence(word, partOfSpeech) {
  const cleanWord = (word || '').trim();
  const pos = (partOfSpeech || '').toLowerCase().trim();

  let hash = 0;
  for (let i = 0; i < cleanWord.length; i++) {
    hash = (hash << 5) - hash + cleanWord.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash);

  if (pos.startsWith('v')) {
    const verbTemplates = [
      `Environmental factors can ${cleanWord} biological processes across diverse terrestrial ecosystems.`,
      `Ancient civilizations developed specialized techniques to ${cleanWord} resources in arid environments.`,
      `Public policy initiatives often seek to ${cleanWord} economic stability during periods of rapid transition.`,
      `Researchers observed how migratory species ${cleanWord} their behavior in response to seasonal climate shifts.`
    ];
    return verbTemplates[idx % verbTemplates.length];
  }

  if (pos.startsWith('adj')) {
    const adjTemplates = [
      `Archaeological excavations revealed ${cleanWord} evidence of long-distance trade among early urban societies.`,
      `Scientists analyzed the ${cleanWord} characteristics of marine organisms inhabiting deep oceanic trenches.`,
      `Historians noted that ${cleanWord} economic conditions significantly influenced nineteenth-century industrial growth.`,
      `Ecological studies emphasize the importance of ${cleanWord} environmental patterns in sustaining biodiversity.`
    ];
    return adjTemplates[idx % adjTemplates.length];
  }

  if (pos.startsWith('adv')) {
    const advTemplates = [
      `Climatic variations can ${cleanWord} alter the distribution of native plant and animal populations.`,
      `Technological innovations have ${cleanWord} transformed how researchers collect and analyze astronomical data.`,
      `Urban infrastructure projects ${cleanWord} reshaped settlement patterns across metropolitan regions.`
    ];
    return advTemplates[idx % advTemplates.length];
  }

  const nounTemplates = [
    `Historians examine how ${cleanWord} shaped the political and economic institutions of early societies.`,
    `Empirical studies demonstrate that ${cleanWord} plays a critical role in maintaining ecological balance.`,
    `Sociologists analyzed how rapid industrialization contributed to growing ${cleanWord} within urban centers.`,
    `Long-term field observations provide valuable insight into the effects of ${cleanWord} on regional ecosystems.`
  ];
  return nounTemplates[idx % nounTemplates.length];
}

// Sentence Lookup / Fallback Generator
function getExampleSentenceAndTranslation(word, meaning) {
  const normalizedWord = (word || '').toLowerCase().trim();

  // Check curated TOEFL 2026 dictionary map first
  if (TOEFL_SENTENCE_MAP[normalizedWord]) {
    return {
      sentence: TOEFL_SENTENCE_MAP[normalizedWord].en,
      translation: TOEFL_SENTENCE_MAP[normalizedWord].ko
    };
  }

  const cleanWord = (word || '').trim();
  const cleanMeaning = (meaning && meaning !== '주요 학술 단어') ? meaning.split('/')[0].trim() : cleanWord;

  return {
    sentence: composeContextualToeflSentence(cleanWord, 'noun'),
    translation: `연구자들은 ${cleanMeaning}이(가) 생태계와 사회 구조에 미치는 영향을 분석합니다.`
  };
}

const NON_VERB_ATE_WORDS = new Set([
  'accurate', 'adequate', 'affectionate', 'appropriate', 'articulate', 'candidate',
  'celibate', 'certificate', 'chocolate', 'climate', 'collegiate', 'compassionate',
  'conglomerate', 'considerate', 'consulate', 'corporate', 'deliberate', 'delicate',
  'desolate', 'desperate', 'disparate', 'doctorate', 'elaborate', 'electorate',
  'emirate', 'estate', 'fortunate', 'frigate', 'graduate', 'illiterate', 'immaculate',
  'immediate', 'inaccurate', 'inadequate', 'inappropriate', 'inanimate', 'incarnate',
  'inconsiderate', 'indeterminate', 'indiscriminate', 'inordinate', 'intemperate',
  'intermediate', 'intimate', 'intricate', 'invertebrate', 'inveterate', 'irate',
  'laureate', 'legitimate', 'literate', 'magistrate', 'mandate', 'moderate',
  'obstinate', 'ornate', 'palate', 'passionate', 'phosphate', 'pirate', 'plate',
  'postgraduate', 'potentate', 'predicate', 'prelate', 'primate', 'private',
  'prostate', 'protectorate', 'proximate', 'rate', 'reprobate', 'sedate', 'senate',
  'separate', 'slate', 'state', 'subordinate', 'substrate', 'sulfate', 'surrogate',
  'syndicate', 'temperate', 'template', 'triumvirate', 'ultimate', 'undergraduate',
  'unfortunate', 'vertebrate'
]);

function normalizePosTag(pos) {
  const p = String(pos || '').toLowerCase().trim();
  if (p === 'v' || p === 'verb' || p.startsWith('verb')) return 'verb';
  if (p === 'n' || p === 'noun' || p.startsWith('noun')) return 'noun';
  if (p === 'adj' || p === 'adjective' || p.startsWith('adj')) return 'adjective';
  if (p === 'adv' || p === 'adverb' || p.startsWith('adv')) return 'adverb';
  return p;
}

function inferPrimaryPOS(word, dictPosList = [], dmPos = '') {
  const clean = String(word || '').toLowerCase().trim();
  const normalizedList = dictPosList.map(normalizePosTag).filter(Boolean);
  const normalizedDm = normalizePosTag(dmPos);

  const uniquePos = Array.from(new Set(normalizedList));
  if (uniquePos.length === 1) {
    return uniquePos[0];
  }

  const hasVerb = uniquePos.includes('verb') || normalizedDm === 'verb';
  const hasAdj = uniquePos.includes('adjective') || normalizedDm === 'adjective';
  const hasAdv = uniquePos.includes('adverb') || normalizedDm === 'adverb';
  const hasNoun = uniquePos.includes('noun') || normalizedDm === 'noun';

  if (!clean.includes(' ')) {
    if (/(ify|ize|ise)$/i.test(clean) && (hasVerb || uniquePos.length === 0)) return 'verb';
    if (/ate$/i.test(clean) && clean.length > 5 && !NON_VERB_ATE_WORDS.has(clean) && (hasVerb || uniquePos.length === 0)) {
      return 'verb';
    }
    if (/(tion|sion|ity|ness|ance|ence|ism|ship|hood|logy|graphy|cracy)$/i.test(clean) && (hasNoun || uniquePos.length === 0)) {
      return 'noun';
    }
    if (/(ous|less|able|ible|ful)$/i.test(clean) && (hasAdj || uniquePos.length === 0)) {
      return 'adjective';
    }
    if (/ly$/i.test(clean) && clean.length > 4 && (hasAdv || uniquePos.length === 0)) {
      return 'adverb';
    }
  }

  if (normalizedList.length > 0) return normalizedList[0];
  if (normalizedDm) return normalizedDm;
  return '';
}

function isPosMismatchMeaning(word, meaning) {
  if (!word || !meaning) return true;
  const clean = word.toLowerCase().trim();
  const m = meaning.trim();
  if (TOEFL_SENTENCE_MAP[clean]?.meaning && m !== TOEFL_SENTENCE_MAP[clean].meaning) {
    // Check if current meaning has wrong POS (e.g. verb without ~다 or adj ending in ~적)
    if (!/다$/.test(m) && /다$/.test(TOEFL_SENTENCE_MAP[clean].meaning)) return true;
    if (/적$/.test(m)) return true;
  }
  const inferred = inferPrimaryPOS(clean);
  if (inferred === 'verb' && !/다$/.test(m)) return true;
  if (inferred === 'adjective' && /적$/.test(m)) return true;
  return false;
}

async function formatKoreanMeaningByPOS(word, rawMeaning, primaryPos, allPosList = []) {
  const pos = normalizePosTag(primaryPos || inferPrimaryPOS(word));
  let meaning = (rawMeaning || '').replace(/\.$/, '').trim();
  if (!meaning) return '';

  if (pos === 'verb') {
    if (/다$/.test(meaning)) return meaning;

    const infTrans = await translateWithGoogleGTX(`to ${word.trim()}`, 'ko');
    if (infTrans) {
      const cleanedInf = infTrans.replace(/\.$/, '').trim();
      if (/다$/.test(cleanedInf) && !/(있다|없다)$/.test(cleanedInf)) {
        return cleanedInf;
      }
      const stemMatch = cleanedInf.match(/^(.+?)(?:기\s*위해(?:서|서는)?|기\s*위한(?:\s*것)?|는\s*것|기)$/);
      if (stemMatch && stemMatch[1]) {
        return `${stemMatch[1].trim()}다`;
      }
    }

    return meaning
      .split(/\s*[\/,]\s*/)
      .map(part => {
        const p = part.trim();
        if (!p || /다$/.test(p)) return p;
        return `${p}하다`;
      })
      .join(' / ');
  }

  if (pos === 'adjective') {
    if (/적$/.test(meaning)) return `${meaning}인`;
    if (/(한|적인|없는|있는|운|른|신|은|는|로운|스러운)$/.test(meaning)) return meaning;

    const adjTrans = await translateWithGoogleGTX(`very ${word.trim()}`, 'ko');
    if (adjTrans) {
      const stripped = adjTrans.replace(/^(매우|아주|정말|무척|너무)\s+/, '').replace(/\.$/, '').trim();
      if (stripped && hasKoreanChars(stripped)) {
        return /적$/.test(stripped) ? `${stripped}인` : stripped;
      }
    }
    return meaning;
  }

  if (pos === 'adverb') {
    if (/적$/.test(meaning)) return `${meaning}으로`;
    if (/적인$/.test(meaning)) return meaning.replace(/적인$/, '적으로');
    if (/한$/.test(meaning)) return meaning.replace(/한$/, '하게');
    return meaning;
  }

  if (pos === 'noun' && !allPosList.includes('verb')) {
    if (/하다$/.test(meaning)) return meaning.replace(/하다$/, '');
  }

  return meaning;
}

// Helper: Sanitize & auto-upgrade legacy generic repetitive sentences & POS-mismatched meanings
function sanitizeExampleSentence(wordObj) {
  if (!wordObj || !wordObj.word) return;
  const normalizedWord = wordObj.word.toLowerCase().trim();
  if (TOEFL_SENTENCE_MAP[normalizedWord]) {
    let changed = false;
    if (TOEFL_SENTENCE_MAP[normalizedWord].meaning && isPosMismatchMeaning(wordObj.word, wordObj.meaning)) {
      wordObj.meaning = TOEFL_SENTENCE_MAP[normalizedWord].meaning;
      changed = true;
    }
    if (
      isGenericTemplateSentence(wordObj.exampleSentence) ||
      isGenericTemplateTranslation(wordObj.exampleTranslation, wordObj.word)
    ) {
      wordObj.exampleSentence = TOEFL_SENTENCE_MAP[normalizedWord].en;
      wordObj.exampleTranslation = TOEFL_SENTENCE_MAP[normalizedWord].ko;
      changed = true;
    }
    if (changed) {
      saveEditedWordMap(wordObj.id, wordObj);
    }
    return;
  }
  if (isPosMismatchMeaning(wordObj.word, wordObj.meaning)) {
    const inferred = inferPrimaryPOS(normalizedWord);
    if (inferred === 'verb' && wordObj.meaning && !/다$/.test(wordObj.meaning.trim())) {
      wordObj.meaning = `${wordObj.meaning.trim()}하다`;
      saveEditedWordMap(wordObj.id, wordObj);
    } else if (inferred === 'adjective' && wordObj.meaning && /적$/.test(wordObj.meaning.trim())) {
      wordObj.meaning = `${wordObj.meaning.trim()}인`;
      saveEditedWordMap(wordObj.id, wordObj);
    }
  }
  const currentSentence = wordObj.exampleSentence || '';
  if (!currentSentence) {
    const freshEx = getExampleSentenceAndTranslation(wordObj.word, wordObj.meaning);
    wordObj.exampleSentence = freshEx.sentence;
    wordObj.exampleTranslation = freshEx.translation;
  }
}

// Cloud Database Setup & Badge Status (Firebase Firestore)
async function initCloudDB() {
  if (typeof autoConnectFirebase === 'function') {
    state.isCloudSynced = await autoConnectFirebase();
  } else if (typeof autoConnectSupabase === 'function') {
    state.isCloudSynced = await autoConnectSupabase();
  } else if (typeof initSupabaseClient === 'function') {
    state.isCloudSynced = initSupabaseClient();
  }
  updateCloudBadge();

  // If connected, enable realtime cross-device sync listener
  if (state.isCloudSynced && typeof setupFirebaseRealtimeSync === 'function') {
    setupFirebaseRealtimeSync(handleCloudRealtimeUpdate);
  }
}

function areSetsEqual(setA, setB) {
  if (!setA || !setB || setA.size !== setB.size) return false;
  for (const item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
}

function handleCloudRealtimeUpdate({ favorites, knownWords }) {
  // Ignore realtime cloud callbacks while a card swipe animation is in progress
  // to prevent re-rendering the swiped card mid-animation
  if (state.isSwipingCard) return;

  let changed = false;
  if (favorites && !areSetsEqual(favorites, state.favorites)) {
    state.favorites = favorites;
    saveFavorites();
    changed = true;
  }
  if (knownWords && !areSetsEqual(knownWords, state.knownWords)) {
    state.knownWords = knownWords;
    saveKnownWords();
    changed = true;
  }
  if (changed) {
    state.words.forEach(w => {
      w.isFavorite = state.favorites.has(w.id);
      w.isKnown = state.knownWords.has(w.id);
      w.status = w.isKnown ? 'known' : 'unseen';
    });
    state.allCardStack = state.allCardStack.filter(w => !state.knownWords.has(w.id));
    state.favCardStack = state.favCardStack.filter(w => state.favorites.has(w.id));
    updateUI();
  }
}

function updateCloudBadge() {
  const badgeBtn = document.getElementById('btnCloudBadge');
  const badgeText = document.getElementById('badgeText');
  if (!badgeBtn || !badgeText) return;

  badgeBtn.style.display = 'none';

  if (state.isCloudSynced) {
    badgeBtn.classList.add('synced');
    badgeText.textContent = '🔥 Firebase 연결됨';
  } else {
    badgeBtn.classList.remove('synced');
    badgeText.textContent = '⚙️ DB 연결 대기';
  }
}

// Load Favorites, Known Words & Edits from LocalStorage
function loadSavedState() {
  try {
    const savedFavs = localStorage.getItem(STORAGE_KEY_FAVS);
    if (savedFavs) {
      state.favorites = new Set(JSON.parse(savedFavs));
    }
    const savedKnown = localStorage.getItem(STORAGE_KEY_KNOWN);
    if (savedKnown) {
      state.knownWords = new Set(JSON.parse(savedKnown));
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(Array.from(state.favorites)));
  } catch (e) {
    console.warn('Failed to save favorites', e);
  }
}

function saveKnownWords() {
  try {
    localStorage.setItem(STORAGE_KEY_KNOWN, JSON.stringify(Array.from(state.knownWords)));
  } catch (e) {
    console.warn('Failed to save known words', e);
  }
}

function saveCustomWords(newWord) {
  try {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEY_ADDED) || '[]');
    custom.push(newWord);
    localStorage.setItem(STORAGE_KEY_ADDED, JSON.stringify(custom));
  } catch (e) {
    console.warn('Failed to save custom word', e);
  }
}

function getEditedWordsMap() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_EDITED) || '{}');
  } catch (e) {
    return {};
  }
}

function saveEditedWordMap(id, wordObj) {
  try {
    const map = getEditedWordsMap();
    map[id] = {
      word: wordObj.word,
      meaning: wordObj.meaning,
      exampleSentence: wordObj.exampleSentence,
      exampleTranslation: wordObj.exampleTranslation
    };
    if (wordObj.word) {
      map[wordObj.word.toLowerCase().trim()] = map[id];
    }
    localStorage.setItem(STORAGE_KEY_EDITED, JSON.stringify(map));
  } catch (e) {
    console.warn('Failed to save edited word map', e);
  }
}

// --- Data Fetching & CSV Parser ---
async function fetchAndParseCSV() {
  try {
    const response = await fetch('word.csv');
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const csvText = await response.text();
    await parseCSVData(csvText);
  } catch (err) {
    console.warn('Could not fetch word.csv directly, using fallback dataset:', err);
    useFallbackData();
  }
}

async function parseCSVData(csvText) {
  const lines = csvText.split(/\r?\n/);
  const parsedWords = [];
  const editedMap = getEditedWordsMap();
  
  const startIdx = lines[0] && lines[0].includes('영단어') ? 1 : 0;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = parseCSVLine(line);
    if (parts.length >= 2) {
      let wordStr = parts[0].trim();
      let meaningStr = parts[1].trim();
      
      if (wordStr && meaningStr) {
        const id = `csv_${i}_${wordStr.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const exObj = getExampleSentenceAndTranslation(wordStr, meaningStr);

        let exampleSentence = exObj.sentence;
        let exampleTranslation = exObj.translation;

        // Apply saved user edits if present
        const edit = editedMap[id] || editedMap[wordStr.toLowerCase().trim()];
        if (edit) {
          if (edit.word) wordStr = edit.word;
          if (edit.meaning) meaningStr = edit.meaning;
          if (edit.exampleSentence) exampleSentence = edit.exampleSentence;
          if (edit.exampleTranslation) exampleTranslation = edit.exampleTranslation;
        }

        parsedWords.push({
          id,
          word: wordStr,
          meaning: meaningStr,
          exampleSentence: exampleSentence,
          exampleTranslation: exampleTranslation,
          isFavorite: state.favorites.has(id),
          isKnown: state.knownWords.has(id),
          status: state.knownWords.has(id) ? 'known' : 'unseen'
        });
      }
    }
  }

  if (state.isCloudSynced) {
    if (typeof cloudFetchFavorites === 'function') {
      const cloudFavs = await cloudFetchFavorites();
      if (cloudFavs !== null) {
        cloudFavs.forEach(id => state.favorites.add(id));
        saveFavorites();
        if (typeof cloudPushAllFavorites === 'function' && state.favorites.size > 0) {
          cloudPushAllFavorites(state.favorites);
        }
      }
    }

    if (typeof cloudFetchKnownWords === 'function') {
      const cloudKnown = await cloudFetchKnownWords();
      if (cloudKnown !== null) {
        cloudKnown.forEach(id => state.knownWords.add(id));
        saveKnownWords();
        if (typeof cloudPushAllKnownWords === 'function' && state.knownWords.size > 0) {
          cloudPushAllKnownWords(state.knownWords);
        }
      }
    }
  }

  try {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEY_ADDED) || '[]');
    custom.forEach(item => {
      const edit = editedMap[item.id] || editedMap[item.word.toLowerCase().trim()];
      if (edit) {
        if (edit.word) item.word = edit.word;
        if (edit.meaning) item.meaning = edit.meaning;
        if (edit.exampleSentence) item.exampleSentence = edit.exampleSentence;
        if (edit.exampleTranslation) item.exampleTranslation = edit.exampleTranslation;
      }
      item.isFavorite = state.favorites.has(item.id);
      item.isKnown = state.knownWords.has(item.id);
      const exObj = getExampleSentenceAndTranslation(item.word, item.meaning);
      if (!item.exampleSentence) item.exampleSentence = exObj.sentence;
      if (!item.exampleTranslation) item.exampleTranslation = exObj.translation;
      parsedWords.push(item);
    });
  } catch(e) {}

  if (state.isCloudSynced && typeof cloudFetchCustomWords === 'function') {
    const cloudCustom = await cloudFetchCustomWords();
    if (cloudCustom && Array.isArray(cloudCustom)) {
      cloudCustom.forEach(c => {
        const existingWord = parsedWords.find(w => w.id === c.id);
        const edit = editedMap[c.id] || (c.word ? editedMap[c.word.toLowerCase().trim()] : null);
        if (existingWord) {
          existingWord.word = edit?.word || c.word || existingWord.word;
          existingWord.meaning = edit?.meaning || c.meaning || existingWord.meaning;
          existingWord.exampleSentence = edit?.exampleSentence || c.example_sentence || existingWord.exampleSentence;
          existingWord.exampleTranslation = edit?.exampleTranslation || c.example_translation || existingWord.exampleTranslation;
        } else {
          const exObj = getExampleSentenceAndTranslation(c.word, c.meaning);
          parsedWords.push({
            id: c.id,
            word: edit?.word || c.word,
            meaning: edit?.meaning || c.meaning,
            exampleSentence: edit?.exampleSentence || c.example_sentence || exObj.sentence,
            exampleTranslation: edit?.exampleTranslation || c.example_translation || exObj.translation,
            isFavorite: state.favorites.has(c.id),
            isKnown: state.knownWords.has(c.id),
            status: state.knownWords.has(c.id) ? 'known' : 'unseen'
          });
        }
      });
    }
  }

  parsedWords.forEach(w => {
    sanitizeExampleSentence(w);
    w.isFavorite = state.favorites.has(w.id);
    w.isKnown = state.knownWords.has(w.id);
    w.status = w.isKnown ? 'known' : 'unseen';
  });

  state.words = parsedWords;
  
  const unmemorizedWords = state.words.filter(w => !state.knownWords.has(w.id));
  state.allCardStack = shuffleArray(unmemorizedWords);
  state.favCardStack = shuffleArray(state.words.filter(w => state.favorites.has(w.id)));

  updateUI();

  // Automatically repair any previously added words that had fallback "주요 학술 단어"
  repairPlaceholderMeanings();
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Fallback Data
function useFallbackData() {
  const fallbackList = [
    { word: "prevail", meaning: "널리 퍼지다 / 우세하다" },
    { word: "intoxication", meaning: "취함 / 도취" },
    { word: "reveler", meaning: "술잔치를 벌이는 사람" },
    { word: "illustrious", meaning: "저명한 / 걸출한" },
    { word: "full-fledged", meaning: "온전한 / 완전히 발달한" },
    { word: "refinement", meaning: "정제 / 개선 / 세련됨" },
    { word: "alleviate", meaning: "완화하다 / 덜어주다" },
    { word: "distress", meaning: "(정신적) 고통 / 괴로움" },
    { word: "serendipitous", meaning: "뜻밖의 발견을 하는" },
    { word: "fortuitous", meaning: "우연한 / 행운의" },
    { word: "pivotal", meaning: "중대한 / 결정적인 / 핵심적인" },
    { word: "comprehending", meaning: "이해하는 / 파악하는" },
    { word: "property", meaning: "속성 / 특성 / 재산" },
    { word: "consolidation", meaning: "통합 / 강화 / (기억의) 정착" },
    { word: "impair", meaning: "손상시키다 / 저해하다 / 악화시키다" },
    { word: "queries", meaning: "질문들 / 의문들 / 문의사항" },
    { word: "rejuvenate", meaning: "활력을 되찾게 하다 / 다시 젊어지게 하다" },
    { word: "arteries", meaning: "동맥들 / 주요 수송로" },
    { word: "ripple", meaning: "파문 / 잔물결 / 파장" },
    { word: "erratic", meaning: "불규칙한 / 변덕스러운" },
    { word: "mitigate", meaning: "완화하다 / 경감시키다" },
    { word: "inadvertently", meaning: "무심코 / 의도치 않게" },
    { word: "initiative", meaning: "주도권 / 이니셔티브 / 결단력" },
    { word: "suspense", meaning: "긴장감 / 서스펜스 / 미정" },
    { word: "workforce", meaning: "노동력 / 인력 / 전 종업원" }
  ];

  const editedMap = getEditedWordsMap();

  const words = fallbackList.map((item, idx) => {
    const id = `fb_${idx}_${item.word}`;
    const exObj = getExampleSentenceAndTranslation(item.word, item.meaning);
    const edit = editedMap[id] || editedMap[item.word.toLowerCase().trim()];

    const wordObj = {
      id,
      word: edit?.word || item.word,
      meaning: edit?.meaning || item.meaning,
      exampleSentence: edit?.exampleSentence || exObj.sentence,
      exampleTranslation: edit?.exampleTranslation || exObj.translation,
      isFavorite: state.favorites.has(id),
      isKnown: state.knownWords.has(id),
      status: state.knownWords.has(id) ? 'known' : 'unseen'
    };
    sanitizeExampleSentence(wordObj);
    return wordObj;
  });

  state.words = words;
  const unmemorized = words.filter(w => !state.knownWords.has(w.id));
  state.allCardStack = shuffleArray(unmemorized);
  state.favCardStack = shuffleArray(words.filter(w => state.favorites.has(w.id)));
  updateUI();
}

// --- UI Sync & Rendering ---
function updateUI() {
  updateHeader();
  renderCardStack('tabAll');
  renderCardStack('tabFav');
  renderListView('tabAll');
  renderListView('tabFav');
}

function updateHeader() {
  const headerTitle = document.getElementById('headerTitle');
  const headerSubtitle = document.getElementById('headerSubtitle');
  const pill = document.getElementById('cardProgressPill');
  if (!headerTitle || !headerSubtitle) return;

  if (state.currentTab === 'tabAll') {
    headerTitle.textContent = '전체 단어장';
    headerSubtitle.textContent = `총 ${state.words.length}개의 단어 중 ${state.knownWords.size}개 암기 완료`;
    if (pill) {
      const total = state.allCardStack.length;
      pill.textContent = `${total > 0 ? 1 : 0}/${total}`;
      pill.style.display = 'inline-flex';
    }
  } else if (state.currentTab === 'tabFav') {
    headerTitle.textContent = '찜한 단어장';
    headerSubtitle.textContent = `보관함 단어: ${state.favorites.size}개`;
    if (pill) {
      const total = state.favCardStack.length;
      pill.textContent = `${total > 0 ? 1 : 0}/${total}`;
      pill.style.display = 'inline-flex';
    }
  } else if (state.currentTab === 'tabAdd') {
    headerTitle.textContent = '단어 추가';
    headerSubtitle.textContent = '새로운 TOEFL 단어 추가하기';
    if (pill) {
      pill.style.display = 'none';
    }
  }
}

// --- Card View Renderer ---
function renderCardStack(tabName) {
  const containerId = tabName === 'tabAll' ? 'allCardStack' : 'favCardStack';
  const fabStarId = tabName === 'tabAll' ? 'fabFavoriteAll' : 'fabFavoriteFav';

  const container = document.getElementById(containerId);
  const pill = document.getElementById('cardProgressPill');
  const fabStar = document.getElementById(fabStarId);

  if (!container) return;

  const stack = tabName === 'tabAll' ? state.allCardStack : state.favCardStack;

  container.innerHTML = '';

  if (stack.length === 0) {
    if (tabName === 'tabAll') {
      const totalCount = state.words.length;
      if (totalCount > 0 && state.knownWords.size >= totalCount) {
        container.innerHTML = `
          <div class="empty-stack-card">
            <div class="empty-icon-wrap" style="font-size: 32px;">🎉</div>
            <h3>모든 단어를 마스터했습니다!</h3>
            <p>축하합니다! 전체 ${totalCount}개 단어를 모두 학습하셨습니다.</p>
            <button class="submit-btn" style="margin-top: 16px; width: auto; padding: 10px 20px;" onclick="resetAllProgress()">
              🔄 학습 기록 초기화
            </button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="empty-stack-card">
            <div class="empty-icon-wrap" style="font-size: 32px;">📚</div>
            <h3>남은 단어가 없습니다</h3>
            <p>모든 카드를 한 번씩 검토하셨습니다.</p>
            <button class="submit-btn" style="margin-top: 16px; width: auto; padding: 10px 20px;" onclick="reloadUnmemorizedStack()">
              🔄 미암기 단어 다시 학습하기
            </button>
          </div>
        `;
      }
    } else {
      container.innerHTML = `
        <div class="empty-stack-card">
          <div class="empty-icon-wrap" style="font-size: 32px;">⭐</div>
          <h3>찜한 단어가 없습니다</h3>
          <p>전체 단어장에서 별(⭐) 아이콘을 눌러 찜해보세요!</p>
        </div>
      `;
    }

    if (pill && state.currentTab === tabName) {
      pill.textContent = '0/0';
    }
    if (fabStar) fabStar.classList.remove('active');
    return;
  }

  const topCardObj = stack[stack.length - 1];
  if (fabStar) {
    if (state.favorites.has(topCardObj.id)) {
      fabStar.classList.add('active');
    } else {
      fabStar.classList.remove('active');
    }
  }

  const totalInStack = stack.length;
  if (pill && state.currentTab === tabName) {
    pill.textContent = `1/${totalInStack}`;
  }

  const visibleCards = stack.slice(Math.max(0, stack.length - 3));
  visibleCards.forEach((wordObj, idx) => {
    const stackIndex = visibleCards.length - 1 - idx;
    const isTopCard = stackIndex === 0;

    const cardEl = createFlashcardElement(wordObj, stackIndex, isTopCard, tabName);
    container.appendChild(cardEl);

    if (isTopCard) {
      attachCardEvents(cardEl, wordObj, tabName);
    }
  });
}

function resetAllProgress() {
  state.knownWords.clear();
  saveKnownWords();
  if (state.isCloudSynced && typeof cloudClearKnownWords === 'function') {
    cloudClearKnownWords();
  }
  state.allCardStack = shuffleArray(state.words);
  updateUI();
  showToast('학습 기록이 초기화되었습니다! 🔄');
}

function reloadUnmemorizedStack() {
  const unmemorized = state.words.filter(w => !state.knownWords.has(w.id));
  state.allCardStack = shuffleArray(unmemorized);
  updateUI();
  showToast('미암기 카드를 다시 불러왔습니다! 📚');
}

function createFlashcardElement(wordObj, stackIndex, isTopCard, tabName) {
  const card = document.createElement('div');
  card.className = `flashcard stack-${stackIndex} nth-${stackIndex}`;
  card.dataset.id = wordObj.id;

  const isFav = state.favorites.has(wordObj.id);

  card.innerHTML = `
    <div class="swipe-badge know">KNOW ✅</div>
    <div class="swipe-badge fav">FAV ⭐</div>
    <div class="card-top-bar">
      <div class="card-fav-star ${isFav ? 'is-fav' : ''}" title="${isFav ? '찜한 단어' : ''}">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <button class="audio-btn" data-word="${escapeHtml(wordObj.word)}" title="발음 듣기">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      </button>
    </div>

    <div class="card-center-body">
      <h2 class="english-word">${escapeHtml(wordObj.word)}</h2>

      <div class="revealed-content">
        <div class="korean-meaning">${escapeHtml(wordObj.meaning)}</div>
        <div class="example-box">
          <span class="lbl">TOEFL EXAMPLE</span>
          <p class="example-text">"${escapeHtml(wordObj.exampleSentence)}"</p>
          <p class="example-trans">${escapeHtml(wordObj.exampleTranslation || '')}</p>
        </div>
      </div>
    </div>

    <div class="card-bottom-hint">
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
      <span class="hint-text">Tap to reveal</span>
    </div>
  `;

  const audioBtn = card.querySelector('.audio-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speakWord(wordObj.word);
    });
  }

  return card;
}

function attachCardEvents(cardEl, wordObj, tabName) {
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let hasMoved = false;
  let lastTouchTime = 0;

  const toggleCardReveal = () => {
    if (cardEl.dataset.swiping === 'true' || state.isSwipingCard) return;
    cardEl.classList.toggle('is-revealed');
    const hintText = cardEl.querySelector('.hint-text');
    if (hintText) {
      hintText.textContent = cardEl.classList.contains('is-revealed') ? 'Tap to hide' : 'Tap to reveal';
    }
  };

  const handleStart = (e) => {
    if (cardEl.dataset.swiping === 'true' || state.isSwipingCard) return;
    if (e.type === 'mousedown' && Date.now() - lastTouchTime < 500) return;

    isDragging = true;
    hasMoved = false;
    currentX = 0;
    currentY = 0;
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    cardEl.style.transition = 'none';

    if (e.type === 'mousedown') {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  const handleMove = (e) => {
    if (!isDragging || cardEl.dataset.swiping === 'true') return;
    const touch = e.touches ? e.touches[0] : e;
    currentX = touch.clientX - startX;
    currentY = touch.clientY - startY;

    if (Math.abs(currentX) > 8 || Math.abs(currentY) > 8) {
      hasMoved = true;
    }

    const rotate = currentX * 0.08;
    cardEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotate}deg)`;

    if (currentX > 50) {
      cardEl.classList.add('swiping-right');
      cardEl.classList.remove('swiping-left');
    } else if (currentX < -50) {
      cardEl.classList.add('swiping-left');
      cardEl.classList.remove('swiping-right');
    } else {
      cardEl.classList.remove('swiping-left', 'swiping-right');
    }
  };

  const handleEnd = (e) => {
    if (e && e.type === 'touchend') {
      lastTouchTime = Date.now();
    }
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleEnd);

    if (!isDragging || cardEl.dataset.swiping === 'true') return;
    isDragging = false;

    const threshold = 100;
    const deltaX = currentX;
    currentX = 0;
    currentY = 0;

    if (deltaX > threshold) {
      popTopCard('right', wordObj, tabName);
    } else if (deltaX < -threshold) {
      popTopCard('left', wordObj, tabName);
    } else {
      cardEl.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
      cardEl.style.transform = '';
      cardEl.classList.remove('swiping-left', 'swiping-right');
    }
  };

  cardEl.addEventListener('click', (e) => {
    if (cardEl.dataset.swiping === 'true' || state.isSwipingCard) return;
    if (e.target.closest('.audio-btn') || e.target.closest('.action-btn') || e.target.closest('.fab-favorite')) {
      return;
    }
    if (!hasMoved) {
      toggleCardReveal();
    }
  });

  cardEl.addEventListener('mousedown', handleStart);
  cardEl.addEventListener('touchstart', handleStart, { passive: true });
  cardEl.addEventListener('touchmove', handleMove, { passive: true });
  cardEl.addEventListener('touchend', handleEnd);
  cardEl.addEventListener('touchcancel', handleEnd);
}

function popTopCard(direction, wordObj, tabName) {
  const stack = tabName === 'tabAll' ? state.allCardStack : state.favCardStack;
  if (!wordObj || stack.length === 0 || stack[stack.length - 1].id !== wordObj.id) return;

  // If a previous swipe animation timeout is still pending, flush the UI first
  if (state.swipeTimeoutId) {
    clearTimeout(state.swipeTimeoutId);
    state.swipeTimeoutId = null;
    state.isSwipingCard = false;
    updateUI();
  }

  const containerId = tabName === 'tabAll' ? 'allCardStack' : 'favCardStack';
  const container = document.getElementById(containerId);
  if (!container) return;

  const topCard = container.querySelector('.flashcard.stack-0');
  if (!topCard || topCard.dataset.swiping === 'true') return;

  topCard.dataset.swiping = 'true';
  topCard.style.pointerEvents = 'none';
  state.isSwipingCard = true;

  // Ensure smooth fly-out transition that completes before DOM re-render
  void topCard.offsetWidth;
  topCard.style.transition = 'transform 0.24s ease-out, opacity 0.2s ease-out';
  const flyX = direction === 'right' ? window.innerWidth * 1.2 : -window.innerWidth * 1.2;
  topCard.style.transform = `translate3d(${flyX}px, 50px, 0) rotate(${direction === 'right' ? 35 : -35}deg)`;
  topCard.style.opacity = '0';

  // Smoothly promote underlying cards during the fly-out animation so there is no jump on re-render
  const nextCard = container.querySelector('.flashcard.stack-1');
  if (nextCard) {
    nextCard.style.transition = 'transform 0.24s ease-out, opacity 0.24s ease-out';
    nextCard.style.transform = 'translateY(0) scale(1)';
    nextCard.style.opacity = '1';
  }
  const thirdCard = container.querySelector('.flashcard.stack-2');
  if (thirdCard) {
    thirdCard.style.transition = 'transform 0.24s ease-out, opacity 0.24s ease-out';
    thirdCard.style.transform = 'translateY(12px) scale(0.95)';
    thirdCard.style.opacity = '0.9';
  }

  const wasFavorite = state.favorites.has(wordObj.id);

  // Immediately pop the swiped card from the active stack so any intermediate
  // render never re-displays the already-swiped card
  if (tabName === 'tabAll') {
    state.allCardStack.pop();
  } else {
    state.favCardStack.pop();
  }

  if (direction === 'right') {
    // 1. Mark as known (체크표시 / 암기 완료): removes from card deck view
    state.knownWords.add(wordObj.id);
    wordObj.isKnown = true;
    saveKnownWords();

    // 2. Remove from favorites (찜목록에서 제외)
    if (state.favorites.has(wordObj.id)) {
      state.favorites.delete(wordObj.id);
      wordObj.isFavorite = false;
      saveFavorites();
    }

    // Remove from both stacks if marked as known
    state.allCardStack = state.allCardStack.filter(w => w.id !== wordObj.id);
    state.favCardStack = state.favCardStack.filter(w => state.favorites.has(w.id));

    // Single atomic cloud update (cloudToggleKnownWord also removes from favorites in Firestore)
    if (state.isCloudSynced && typeof cloudToggleKnownWord === 'function') {
      cloudToggleKnownWord(wordObj.id, true);
    }

    showToast(`"${wordObj.word}" 암기 완료! ${wasFavorite ? '(찜 해제됨)' : ''} ✅`);
  } else {
    // direction === 'left' (X 버튼 / 왼쪽 스와이프): 찜목록에 추가
    if (!state.favorites.has(wordObj.id)) {
      state.favorites.add(wordObj.id);
      wordObj.isFavorite = true;
      saveFavorites();
      if (state.isCloudSynced && typeof cloudToggleFavorite === 'function') {
        cloudToggleFavorite(wordObj.id, true);
      }
    }
    if (tabName === 'tabAll' && !state.favCardStack.some(w => w.id === wordObj.id)) {
      state.favCardStack.push(wordObj);
    }
    state.favCardStack = state.favCardStack.filter(w => state.favorites.has(w.id));

    showToast(tabName === 'tabFav' ? `"${wordObj.word}" 찜 유지됨 ⭐` : `"${wordObj.word}" 찜 목록에 추가됨 ⭐`);
  }

  state.swipeHistory.push({ wordObj, direction, tabName, wasFavorite });

  state.swipeTimeoutId = setTimeout(() => {
    state.swipeTimeoutId = null;
    state.isSwipingCard = false;
    updateUI();
  }, 240);
}

function undoLastSwipe() {
  if (state.swipeTimeoutId) {
    clearTimeout(state.swipeTimeoutId);
    state.swipeTimeoutId = null;
    state.isSwipingCard = false;
  }

  if (state.swipeHistory.length === 0) {
    showToast('되돌릴 카드 내역이 없습니다.');
    return;
  }

  const last = state.swipeHistory.pop();
  if (last.direction === 'right') {
    state.knownWords.delete(last.wordObj.id);
    last.wordObj.isKnown = false;
    saveKnownWords();
    if (state.isCloudSynced && typeof cloudToggleKnownWord === 'function') {
      cloudToggleKnownWord(last.wordObj.id, false);
    }

    if (last.wasFavorite) {
      state.favorites.add(last.wordObj.id);
      last.wordObj.isFavorite = true;
      saveFavorites();
      if (state.isCloudSynced && typeof cloudToggleFavorite === 'function') {
        cloudToggleFavorite(last.wordObj.id, true);
      }
      if (!state.favCardStack.some(w => w.id === last.wordObj.id)) {
        state.favCardStack.push(last.wordObj);
      }
    }
    if (last.tabName === 'tabFav' && !state.allCardStack.some(w => w.id === last.wordObj.id)) {
      state.allCardStack.push(last.wordObj);
    }
  } else if (last.direction === 'left') {
    if (!last.wasFavorite) {
      state.favorites.delete(last.wordObj.id);
      last.wordObj.isFavorite = false;
      saveFavorites();
      if (state.isCloudSynced && typeof cloudToggleFavorite === 'function') {
        cloudToggleFavorite(last.wordObj.id, false);
      }
      state.favCardStack = state.favCardStack.filter(w => w.id !== last.wordObj.id);
    }
  }

  if (last.tabName === 'tabAll') {
    state.allCardStack = state.allCardStack.filter(w => w.id !== last.wordObj.id);
    state.allCardStack.push(last.wordObj);
  } else {
    state.favCardStack = state.favCardStack.filter(w => w.id !== last.wordObj.id);
    state.favCardStack.push(last.wordObj);
  }

  updateUI();
  showToast(`"${last.wordObj.word}" 되돌리기 완료! ↩️`);
}


// --- List View Renderer ---
function renderListView(tabName) {
  const containerId = tabName === 'tabAll' ? 'allWordList' : 'favWordList';
  const query = tabName === 'tabAll' ? state.searchAllQuery : state.searchFavQuery;
  const container = document.getElementById(containerId);
  
  if (!container) return;

  let dataset = tabName === 'tabAll' ? state.words : state.words.filter(w => state.favorites.has(w.id));

  if (query) {
    const q = query.toLowerCase();
    dataset = dataset.filter(w => w.word.toLowerCase().includes(q) || w.meaning.includes(q));
  }

  container.innerHTML = '';

  if (dataset.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #8E8E93;">
        ${query ? '검색 결과가 없습니다' : '표시할 단어가 없습니다'}
      </div>
    `;
    return;
  }

  dataset.forEach(wordObj => {
    const itemEl = document.createElement('div');
    itemEl.className = 'word-list-item';
    const isFav = state.favorites.has(wordObj.id);
    const isKnown = state.knownWords.has(wordObj.id);

    itemEl.innerHTML = `
      <div class="word-item-info" style="flex: 1;">
        <div class="word-item-header">
          <span class="word-item-title">${escapeHtml(wordObj.word)}</span>
          ${isKnown ? '<span style="font-size: 10px; background: rgba(48, 209, 88, 0.15); color: #30D158; padding: 2px 6px; border-radius: 6px; font-weight: 700;">알음 ✓</span>' : ''}
          <button class="list-audio-btn" data-word="${escapeHtml(wordObj.word)}" title="발음 듣기">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>
        <span class="word-item-meaning">${escapeHtml(wordObj.meaning)}</span>
        <div style="margin-top: 4px; font-size: 11px; color: #475569; font-style: italic;">
          "${escapeHtml(wordObj.exampleSentence)}"
        </div>
        <div style="font-size: 11px; color: #64748B;">
          ${escapeHtml(wordObj.exampleTranslation || '')}
        </div>
      </div>

      <button class="list-edit-btn" data-id="${wordObj.id}" title="단어/뜻 수정">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>

      <button class="star-toggle-btn ${isFav ? 'active' : ''}" data-id="${wordObj.id}" title="찜하기">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </button>
    `;

    const audioBtn = itemEl.querySelector('.list-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => speakWord(wordObj.word));
    }

    const editBtn = itemEl.querySelector('.list-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(wordObj);
      });
    }

    const starBtn = itemEl.querySelector('.star-toggle-btn');
    if (starBtn) {
      starBtn.addEventListener('click', async () => {
        const id = wordObj.id;
        const newFavState = !state.favorites.has(id);
        if (newFavState) {
          state.favorites.add(id);
          wordObj.isFavorite = true;
          showToast(`"${wordObj.word}" 찜 목록에 추가됨 ⭐`);
        } else {
          state.favorites.delete(id);
          wordObj.isFavorite = false;
          showToast(`"${wordObj.word}" 찜 해제됨`);
        }
        saveFavorites();

        if (state.isCloudSynced && typeof cloudToggleFavorite === 'function') {
          cloudToggleFavorite(id, newFavState);
        }

        state.favCardStack = shuffleArray(state.words.filter(w => state.favorites.has(w.id)));
        updateUI();
      });
    }

    container.appendChild(itemEl);
  });
}

// --- Edit Word Modal Functions ---
function openEditModal(wordObj) {
  state.editingWordId = wordObj.id;
  const modal = document.getElementById('editWordModal');
  const wordInput = document.getElementById('editWordInput');
  const meaningInput = document.getElementById('editMeaningInput');
  const exampleInput = document.getElementById('editExampleInput');
  const translationInput = document.getElementById('editTranslationInput');

  if (!modal || !wordInput || !meaningInput || !exampleInput || !translationInput) return;

  wordInput.value = wordObj.word || '';
  meaningInput.value = wordObj.meaning || '';
  exampleInput.value = wordObj.exampleSentence || '';
  translationInput.value = wordObj.exampleTranslation || '';

  modal.classList.add('show');
}

function bindEditModalEvents() {
  const modal = document.getElementById('editWordModal');
  const btnClose = document.getElementById('btnCloseEditModal');
  const btnAutoFill = document.getElementById('btnEditAutoFill');
  const btnSave = document.getElementById('btnSaveEditWord');

  if (btnClose && modal) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('show');
      state.editingWordId = null;
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        state.editingWordId = null;
      }
    });
  }

  if (btnAutoFill) {
    btnAutoFill.addEventListener('click', async () => {
      const wordInput = document.getElementById('editWordInput');
      const wordVal = wordInput ? wordInput.value.trim() : '';
      if (!wordVal) {
        showToast('영단어를 먼저 입력해주세요!');
        return;
      }

      showToast(`⏳ "${wordVal}" 고정밀 사전/번역 API 조회 중...`);
      const result = await fetchAutoMeaningAndExample(wordVal);
      if (result) {
        document.getElementById('editMeaningInput').value = result.meaning || '';
        document.getElementById('editExampleInput').value = result.exampleSentence || '';
        document.getElementById('editTranslationInput').value = result.exampleTranslation || '';
        showToast('✨ 고정밀 뜻 & 예문 자동 등록 완료!');
      }
    });
  }

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      if (!state.editingWordId) return;

      const wordInput = document.getElementById('editWordInput');
      const meaningInput = document.getElementById('editMeaningInput');
      const exampleInput = document.getElementById('editExampleInput');
      const translationInput = document.getElementById('editTranslationInput');

      const wordVal = wordInput ? wordInput.value.trim() : '';
      const meaningVal = meaningInput ? meaningInput.value.trim() : '';
      const exampleVal = exampleInput ? exampleInput.value.trim() : '';
      const translationVal = translationInput ? translationInput.value.trim() : '';

      if (!wordVal || !meaningVal) {
        showToast('영단어와 뜻을 입력해주세요!');
        return;
      }

      const wordObj = state.words.find(w => w.id === state.editingWordId);
      if (wordObj) {
        wordObj.word = wordVal;
        wordObj.meaning = meaningVal;
        wordObj.exampleSentence = exampleVal || getExampleSentenceAndTranslation(wordVal, meaningVal).sentence;
        wordObj.exampleTranslation = translationVal || getExampleSentenceAndTranslation(wordVal, meaningVal).translation;

        saveEditedWordMap(wordObj.id, wordObj);

        if (state.isCloudSynced && typeof cloudAddCustomWord === 'function') {
          cloudAddCustomWord(wordObj);
        }

        updateUI();
        if (modal) modal.classList.remove('show');
        showToast(`✏️ "${wordVal}" 단어 정보가 수정되었습니다!`);
      }
      state.editingWordId = null;
    });
  }
}

// --- Navigation & View Mode Handlers ---
function bindEvents() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.swipeTimeoutId) {
        clearTimeout(state.swipeTimeoutId);
        state.swipeTimeoutId = null;
        state.isSwipingCard = false;
      }

      const tabId = btn.dataset.tab;
      
      if (tabId === 'tabAll') {
        const unmemorized = state.words.filter(w => !state.knownWords.has(w.id));
        state.allCardStack = shuffleArray(unmemorized);
      } else if (tabId === 'tabFav') {
        state.favCardStack = shuffleArray(state.words.filter(w => state.favorites.has(w.id)));
      }

      switchTab(tabId);
      updateUI();
    });
  });

  document.getElementById('btnModeCard').addEventListener('click', () => setViewMode('card'));
  document.getElementById('btnModeList').addEventListener('click', () => setViewMode('list'));

  document.getElementById('searchAllInput').addEventListener('input', (e) => {
    state.searchAllQuery = e.target.value;
    renderListView('tabAll');
  });

  document.getElementById('searchFavInput').addEventListener('input', (e) => {
    state.searchFavQuery = e.target.value;
    renderListView('tabFav');
  });

  document.getElementById('btnSwipeLeft').addEventListener('click', () => {
    const stack = state.allCardStack;
    if (stack.length > 0) {
      popTopCard('left', stack[stack.length - 1], 'tabAll');
    }
  });

  document.getElementById('btnSwipeRight').addEventListener('click', () => {
    const stack = state.allCardStack;
    if (stack.length > 0) {
      popTopCard('right', stack[stack.length - 1], 'tabAll');
    }
  });

  document.getElementById('btnUndoSwipe').addEventListener('click', undoLastSwipe);

  document.getElementById('fabFavoriteAll').addEventListener('click', async () => {
    const stack = state.allCardStack;
    if (stack.length === 0) return;
    const wordObj = stack[stack.length - 1];
    const id = wordObj.id;

    const newFavState = !state.favorites.has(id);
    if (newFavState) {
      state.favorites.add(id);
      wordObj.isFavorite = true;
      if (!state.favCardStack.some(w => w.id === id)) {
        state.favCardStack.push(wordObj);
      }
      showToast(`"${wordObj.word}" 찜 목록에 추가됨 ⭐`);
    } else {
      state.favorites.delete(id);
      wordObj.isFavorite = false;
      state.favCardStack = state.favCardStack.filter(w => w.id !== id);
      showToast(`"${wordObj.word}" 찜 해제됨`);
    }
    saveFavorites();

    if (state.isCloudSynced && typeof cloudToggleFavorite === 'function') {
      cloudToggleFavorite(id, newFavState);
    }

    updateUI();
  });

  document.getElementById('favBtnSwipeLeft').addEventListener('click', () => {
    const stack = state.favCardStack;
    if (stack.length > 0) {
      popTopCard('left', stack[stack.length - 1], 'tabFav');
    }
  });

  document.getElementById('favBtnSwipeRight').addEventListener('click', () => {
    const stack = state.favCardStack;
    if (stack.length > 0) {
      popTopCard('right', stack[stack.length - 1], 'tabFav');
    }
  });

  document.getElementById('fabFavoriteFav').addEventListener('click', async () => {
    const stack = state.favCardStack;
    if (stack.length === 0) return;
    const wordObj = stack[stack.length - 1];
    const id = wordObj.id;

    state.favorites.delete(id);
    wordObj.isFavorite = false;
    saveFavorites();
    showToast(`"${wordObj.word}" 찜 해제됨`);

    if (state.isCloudSynced && typeof cloudToggleFavorite === 'function') {
      cloudToggleFavorite(id, false);
    }

    state.favCardStack = shuffleArray(state.words.filter(w => state.favorites.has(w.id)));
    updateUI();
  });

  const btnAutoFill = document.getElementById('btnAutoFill');
  if (btnAutoFill) {
    btnAutoFill.addEventListener('click', async () => {
      const wordInput = document.getElementById('inputWord');
      const wordVal = wordInput ? wordInput.value.trim() : '';

      if (!wordVal) {
        showToast('영단어를 먼저 입력해주세요!');
        return;
      }

      showToast(`⏳ "${wordVal}" 뜻 자동 생성 중...`);
      const autoResult = await fetchAutoMeaningAndExample(wordVal);
      if (autoResult && autoResult.meaning) {
        const meaningEl = document.getElementById('inputMeaning');
        if (meaningEl) meaningEl.value = autoResult.meaning;
        showToast('✨ 뜻이 자동 입력되었습니다!');
      } else {
        showToast('⚠️ 뜻을 자동으로 가져오지 못했습니다. 직접 입력해주세요.');
      }
    });
  }

  const addForm = document.getElementById('addWordForm');
  if (addForm) {
    addForm.addEventListener('submit', handleAddWordSubmit);
  }

  const btnExportCSV = document.getElementById('btnExportCSV');
  if (btnExportCSV) {
    btnExportCSV.addEventListener('click', handleExportCSV);
  }

  const btnCloudBadge = document.getElementById('btnCloudBadge');
  const dbModal = document.getElementById('dbModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnSaveDbConfig = document.getElementById('btnSaveDbConfig');

  if (btnCloudBadge && dbModal) {
    btnCloudBadge.addEventListener('click', () => {
      dbModal.classList.add('show');
    });
  }

  if (btnCloseModal && dbModal) {
    btnCloseModal.addEventListener('click', () => {
      dbModal.classList.remove('show');
    });
  }

  if (btnSaveDbConfig && dbModal) {
    btnSaveDbConfig.addEventListener('click', () => {
      const urlInput = document.getElementById('modalSupabaseUrl');
      const keyInput = document.getElementById('modalSupabaseKey');
      if (urlInput && keyInput) {
        const success = saveSupabaseConfig(urlInput.value, keyInput.value);
        state.isCloudSynced = success;
        updateCloudBadge();
        dbModal.classList.remove('show');
        showToast(success ? 'Supabase DB 연동 성공! 🎉' : '연동 정보가 저장되었습니다');
      }
    });
  }

  const btnPushToCloud = document.getElementById('btnPushToCloud');
  if (btnPushToCloud) {
    btnPushToCloud.addEventListener('click', async () => {
      if (!state.isCloudSynced) {
        showToast('⚠️ DB 연동 상태를 먼저 확인해주세요.');
        return;
      }
      btnPushToCloud.textContent = '⏳ 전송 중...';
      btnPushToCloud.disabled = true;

      try {
        await cloudPushAllFavorites(state.favorites);
        await cloudPushAllKnownWords(state.knownWords);
        showToast(`📱 현재 기기 기록(암기 ${state.knownWords.size}개, 찜 ${state.favorites.size}개)이 클라우드에 덮어써졌습니다! ✅`);
      } catch (e) {
        console.warn('Push error:', e);
        showToast('❌ 동기화 중 오류가 발생했습니다.');
      } finally {
        btnPushToCloud.textContent = '📱 현재 기기(핸드폰) 기록 클라우드에 덮어쓰기';
        btnPushToCloud.disabled = false;
      }
    });
  }

  const btnPullFromCloud = document.getElementById('btnPullFromCloud');
  if (btnPullFromCloud) {
    btnPullFromCloud.addEventListener('click', async () => {
      if (!state.isCloudSynced) {
        showToast('⚠️ DB 연동 상태를 먼저 확인해주세요.');
        return;
      }
      btnPullFromCloud.textContent = '⏳ 불러오는 중...';
      btnPullFromCloud.disabled = true;

      try {
        const cloudFavs = typeof cloudFetchFavorites === 'function' ? await cloudFetchFavorites() : null;
        const cloudKnown = typeof cloudFetchKnownWords === 'function' ? await cloudFetchKnownWords() : null;

        if (cloudFavs) {
          state.favorites = cloudFavs;
          saveFavorites();
        }
        if (cloudKnown) {
          state.knownWords = cloudKnown;
          saveKnownWords();
        }

        state.words.forEach(w => {
          w.isFavorite = state.favorites.has(w.id);
          w.isKnown = state.knownWords.has(w.id);
          w.status = w.isKnown ? 'known' : 'unseen';
        });

        const unmemorizedWords = state.words.filter(w => !state.knownWords.has(w.id));
        state.allCardStack = shuffleArray(unmemorizedWords);
        state.favCardStack = shuffleArray(state.words.filter(w => state.favorites.has(w.id)));

        updateUI();
        showToast(`💻 클라우드 기록(암기 ${state.knownWords.size}개, 찜 ${state.favorites.size}개)으로 동기화 완료! ✅`);
      } catch (e) {
        console.warn('Pull error:', e);
        showToast('❌ 동기화 중 오류가 발생했습니다.');
      } finally {
        btnPullFromCloud.textContent = '💻 클라우드 기록 이 기기로 불러오기';
        btnPullFromCloud.disabled = false;
      }
    });
  }

  const btnResetStudyData = document.getElementById('btnResetStudyData');
  if (btnResetStudyData) {
    btnResetStudyData.addEventListener('click', async () => {
      if (!confirm('정말로 찜하기와 학습 완료 기록을 모두 초기화하시겠습니까?\n(등록된 단어와 단어장은 그대로 안전하게 유지됩니다.)')) {
        return;
      }
      btnResetStudyData.textContent = '⏳ 초기화 중...';
      btnResetStudyData.disabled = true;

      try {
        state.favorites.clear();
        state.knownWords.clear();
        saveFavorites();
        saveKnownWords();

        if (state.isCloudSynced) {
          if (typeof cloudPushAllFavorites === 'function') await cloudPushAllFavorites(new Set());
          if (typeof cloudClearKnownWords === 'function') await cloudClearKnownWords();
        }

        state.words.forEach(w => {
          w.isFavorite = false;
          w.isKnown = false;
          w.status = 'unseen';
        });

        state.allCardStack = shuffleArray([...state.words]);
        state.favCardStack = [];
        state.allCardIndex = 0;
        state.favCardIndex = 0;

        updateUI();
        if (dbModal) dbModal.classList.remove('show');
        showToast('✨ 찜하기 및 학습 기록이 깨끗하게 초기화되었습니다!');
      } catch (e) {
        console.error('Reset error:', e);
        showToast('❌ 초기화 중 오류가 발생했습니다.');
      } finally {
        btnResetStudyData.textContent = '🧹 찜하기 및 학습 완료 기록 싹 비우기 (단어 목록은 유지)';
        btnResetStudyData.disabled = false;
      }
    });
  }

  const btnCopyKnownSql = document.getElementById('btnCopyKnownSql');
  if (btnCopyKnownSql) {
    btnCopyKnownSql.addEventListener('click', () => {
      const sqlText = document.getElementById('sqlSnippetText');
      if (sqlText) {
        navigator.clipboard.writeText(sqlText.value).then(() => {
          showToast('📋 SQL 구문이 복사되었습니다!');
        }).catch(() => {
          sqlText.select();
          document.execCommand('copy');
          showToast('📋 SQL 구문이 복사되었습니다!');
        });
      }
    });
  }
}

// --- Desktop Keyboard Shortcuts ---
function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // 1. Ignore shortcuts when typing in inputs or textareas
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
      return;
    }

    // 2. ESC key closes open modals
    const modal = document.getElementById('dbModal');
    const editModal = document.getElementById('editWordModal');
    if ((modal && modal.classList.contains('show')) || (editModal && editModal.classList.contains('show'))) {
      if (e.key === 'Escape') {
        if (modal) modal.classList.remove('show');
        if (editModal) {
          editModal.classList.remove('show');
          state.editingWordId = null;
        }
      }
      return;
    }

    const isTabAll = state.currentTab === 'tabAll';
    const isTabFav = state.currentTab === 'tabFav';
    const activeStack = isTabAll ? state.allCardStack : (isTabFav ? state.favCardStack : null);
    const activeTab = isTabAll ? 'tabAll' : (isTabFav ? 'tabFav' : null);
    const viewMode = isTabAll ? state.allViewMode : state.favViewMode;

    if (!activeStack || viewMode !== 'card') return;

    // Left Arrow or 'A': Swipe Left (복습해요/몰라요 - Red)
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      if (activeStack.length > 0) {
        popTopCard('left', activeStack[activeStack.length - 1], activeTab);
      }
    }
    // Right Arrow or 'D': Swipe Right (알아요 - Green)
    else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      if (activeStack.length > 0) {
        popTopCard('right', activeStack[activeStack.length - 1], activeTab);
      }
    }
    // Up Arrow or Space bar: Flip card (뜻 보기 / 숨기기)
    else if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      const selector = isTabAll ? '#tabAll .flashcard:last-child' : '#tabFav .flashcard:last-child';
      const topCard = document.querySelector(selector);
      if (topCard) topCard.click();
    }
    // Down Arrow or 'Z' or Backspace: Undo last swipe (되돌리기)
    else if (e.key === 'ArrowDown' || e.key === 'z' || e.key === 'Z' || (e.key === 'Backspace' && !active)) {
      e.preventDefault();
      undoLastSwipe();
    }
    // 'F' or 'S': Toggle Favorite (찜하기 스파크)
    else if (e.key === 'f' || e.key === 'F' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      const fabId = isTabAll ? 'fabFavoriteAll' : 'fabFavoriteFav';
      const fab = document.getElementById(fabId);
      if (fab) fab.click();
    }
  });
}

function switchTab(tabId) {
  state.currentTab = tabId;

  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  const viewModeToggle = document.getElementById('viewModeToggle');
  if (viewModeToggle) {
    if (tabId === 'tabAdd') {
      viewModeToggle.style.visibility = 'hidden';
      viewModeToggle.style.pointerEvents = 'none';
    } else {
      viewModeToggle.style.visibility = 'visible';
      viewModeToggle.style.pointerEvents = 'auto';
      const activeMode = tabId === 'tabAll' ? state.allViewMode : state.favViewMode;
      setSegmentedActive(activeMode);
    }
  }

  updateHeader();
}

function setViewMode(mode) {
  if (state.swipeTimeoutId) {
    clearTimeout(state.swipeTimeoutId);
    state.swipeTimeoutId = null;
    state.isSwipingCard = false;
    updateUI();
  }

  if (state.currentTab === 'tabAll') {
    state.allViewMode = mode;
    const cardView = document.getElementById('allCardView');
    const listView = document.getElementById('allListView');
    if (mode === 'card') {
      cardView.style.display = 'flex';
      listView.style.display = 'none';
    } else {
      cardView.style.display = 'none';
      listView.style.display = 'flex';
    }
  } else if (state.currentTab === 'tabFav') {
    state.favViewMode = mode;
    const cardView = document.getElementById('favCardView');
    const listView = document.getElementById('favListView');
    if (mode === 'card') {
      cardView.style.display = 'flex';
      listView.style.display = 'none';
    } else {
      cardView.style.display = 'none';
      listView.style.display = 'flex';
    }
  }

  setSegmentedActive(mode);
}

function setSegmentedActive(mode) {
  const btnCard = document.getElementById('btnModeCard');
  const btnList = document.getElementById('btnModeList');
  if (mode === 'card') {
    btnCard.classList.add('active');
    btnList.classList.remove('active');
  } else {
    btnList.classList.add('active');
    btnCard.classList.remove('active');
  }
}

// --- Word Validation (Typo / Non-existent Word Check) ---
async function isValidEnglishWord(word) {
  const clean = word.toLowerCase().trim();
  if (!clean || !/^[a-zA-Z\s'-]+$/.test(clean)) return false;

  // Validate individual word tokens so multi-word idioms/phrases (e.g. "in accordance with") pass validation
  const tokens = clean.split(/\s+/).filter(Boolean);
  try {
    for (const token of tokens) {
      const res = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(token)}&max=1`);
      if (res.ok) {
        const data = await res.json();
        const matched = Array.isArray(data) && data.length > 0 && data[0].word.toLowerCase() === token;
        if (!matched) return false;
      }
    }
    return true;
  } catch (err) {
    console.warn('[Word Validation Error]', err);
  }
  return true; // Fallback if API fails
}

function hasKoreanChars(str) {
  return /[가-힣]/.test(str || '');
}

// --- High-Precision Multi-Layer Translation Pipeline ---
async function translateWithGoogleGTX(text, targetLang = 'ko') {
  if (!text || !text.trim()) return '';
  const cleanText = text.trim();
  const q = encodeURIComponent(cleanText);

  // Layer 1: Direct Google GTX with dt=t ONLY (dt=bd triggers Google's automated query block)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${q}`;
    const res = await fetch(url, { referrerPolicy: 'no-referrer' });
    if (res.ok) {
      const data = await res.json();
      if (data && data[0] && Array.isArray(data[0])) {
        const translated = data[0].map(item => item?.[0]).filter(Boolean).join('').trim();
        if (translated && translated.toLowerCase() !== cleanText.toLowerCase()) {
          if (targetLang !== 'ko' || hasKoreanChars(translated)) {
            return translated;
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Google GTX Direct Translate Fallback]', err);
  }

  // Layer 2: Server-side proxy (/api/translate) — bypasses any browser CORS / extension / ITP blocks
  try {
    const proxyRes = await fetch(`/api/translate?text=${q}`);
    if (proxyRes.ok) {
      const proxyData = await proxyRes.json();
      if (proxyData?.translated && proxyData.translated.toLowerCase() !== cleanText.toLowerCase()) {
        return proxyData.translated.trim();
      }
    }
  } catch (err) {}

  // Layer 3: MyMemory Public CORS-Enabled Translation API
  try {
    const mmRes = await fetch(`https://api.mymemory.translated.net/get?q=${q}&langpair=en|${targetLang}`);
    if (mmRes.ok) {
      const mmData = await mmRes.json();
      const matched = (mmData?.responseData?.translatedText || '').trim();
      if (matched && matched.toLowerCase() !== cleanText.toLowerCase() && !matched.includes('MYMEMORY WARNING')) {
        if (targetLang !== 'ko' || hasKoreanChars(matched)) {
          return matched;
        }
      }
    }
  } catch (err) {
    console.warn('[MyMemory Translate Error]', err);
  }

  return '';
}

// --- Oxford / Wiktionary Free Dictionary API for Authentic Definitions & Examples ---
async function fetchFreeDictionaryData(word) {
  if (!word || !word.trim()) return { definition: null, example: null, partOfSpeech: null, allPosList: [] };
  let firstDef = null;
  let firstExample = null;
  const dictPosList = [];
  let dmPos = '';
  const clean = word.toLowerCase().trim();

  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        for (const entry of data) {
          if (entry.meanings && Array.isArray(entry.meanings)) {
            for (const m of entry.meanings) {
              if (m.partOfSpeech) dictPosList.push(normalizePosTag(m.partOfSpeech));
              if (m.definitions && Array.isArray(m.definitions)) {
                for (const d of m.definitions) {
                  if (!firstDef && d.definition) {
                    firstDef = d.definition.trim();
                  }
                  if (!firstExample && d.example && isHighQualityAcademicSentence(d.example, clean)) {
                    firstExample = d.example.trim();
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Free Dictionary API Error]', err);
  }

  // Fallback to Datamuse definition & POS tags if needed
  if (!firstDef || dictPosList.length === 0) {
    try {
      const dmUrl = `https://api.datamuse.com/words?sp=${encodeURIComponent(clean)}&md=dp&max=1`;
      const dmRes = await fetch(dmUrl);
      if (dmRes.ok) {
        const dmData = await dmRes.json();
        if (Array.isArray(dmData) && dmData[0]) {
          if (Array.isArray(dmData[0].defs) && dmData[0].defs.length > 0) {
            const rawDef = dmData[0].defs[0];
            const parts = rawDef.split('\t');
            if (parts.length > 1) {
              dmPos = normalizePosTag(parts[0]);
              if (!firstDef) firstDef = parts[1].trim();
            } else if (!firstDef) {
              firstDef = rawDef.trim();
            }
          }
          if (!dmPos && Array.isArray(dmData[0].tags)) {
            const posTag = dmData[0].tags.find(t => ['v', 'n', 'adj', 'adv'].includes(t));
            if (posTag) dmPos = normalizePosTag(posTag);
          }
        }
      }
    } catch (e) {}
  }

  const allPosList = Array.from(new Set([...dictPosList, dmPos].filter(Boolean)));
  const partOfSpeech = inferPrimaryPOS(clean, dictPosList, dmPos);

  return { definition: firstDef, example: firstExample, partOfSpeech, allPosList };
}

async function fetchFreeDictionaryExample(word) {
  const data = await fetchFreeDictionaryData(word);
  return data.example;
}

// --- High-Accuracy Auto Translation & Example Generator ---
async function fetchAutoMeaningAndExample(word) {
  const cleanWord = word.trim();
  if (!cleanWord) return null;

  const normalizedWord = cleanWord.toLowerCase();

  // 0. Check if already in loaded words with a valid POS-matched meaning
  const existingWord = state.words.find(
    w =>
      w.word.toLowerCase().trim() === normalizedWord &&
      w.meaning &&
      w.meaning !== '주요 학술 단어' &&
      !isPosMismatchMeaning(w.word, w.meaning)
  );

  // 1. Check curated TOEFL map first
  if (TOEFL_SENTENCE_MAP[normalizedWord]) {
    let meaning = TOEFL_SENTENCE_MAP[normalizedWord].meaning || (existingWord ? existingWord.meaning : '');
    if (!meaning) {
      const dictData = await fetchFreeDictionaryData(cleanWord);
      const rawTrans = await translateWithGoogleGTX(cleanWord, 'ko');
      meaning = await formatKoreanMeaningByPOS(cleanWord, rawTrans, dictData.partOfSpeech, dictData.allPosList);
    }
    return {
      word: cleanWord,
      meaning: meaning || '',
      exampleSentence: TOEFL_SENTENCE_MAP[normalizedWord].en,
      exampleTranslation: TOEFL_SENTENCE_MAP[normalizedWord].ko
    };
  }

  let meaning = existingWord ? existingWord.meaning : '';
  let exampleSentence = '';
  let exampleTranslation = '';
  let detectedPos = '';
  let detectedPosList = [];

  // 2. Query server proxy (/api/translate?includeExample=1) which fetches POS-aware Korean meaning + authentic sentences
  try {
    const proxyRes = await fetch(`/api/translate?text=${encodeURIComponent(cleanWord)}&includeExample=1`);
    if (proxyRes.ok) {
      const proxyData = await proxyRes.json();
      if (proxyData?.partOfSpeech) {
        detectedPos = proxyData.partOfSpeech;
      }
      if (!meaning && proxyData?.translated && hasKoreanChars(proxyData.translated)) {
        meaning = proxyData.translated.trim();
      }
      if (proxyData?.exampleSentence && !isGenericTemplateSentence(proxyData.exampleSentence)) {
        exampleSentence = proxyData.exampleSentence.trim();
      }
      if (proxyData?.exampleTranslation && hasKoreanChars(proxyData.exampleTranslation)) {
        exampleTranslation = proxyData.exampleTranslation.trim();
      }
    }
  } catch (e) {}

  // 3. Client-side dictionary & POS lookup if needed
  const dictData = (!exampleSentence || !meaning || !detectedPos)
    ? await fetchFreeDictionaryData(cleanWord)
    : { definition: null, example: null, partOfSpeech: detectedPos, allPosList: [] };

  if (!detectedPos && dictData.partOfSpeech) {
    detectedPos = dictData.partOfSpeech;
  }
  if (dictData.allPosList?.length) {
    detectedPosList = dictData.allPosList;
  }

  if (!meaning) {
    meaning = await translateWithGoogleGTX(cleanWord, 'ko');
  }

  if (!meaning && dictData.definition) {
    const shortDef = dictData.definition.replace(/^(\s*\([^)]*\)\s*)+/g, '').split(';')[0].replace(/\.$/, '').trim();
    const translatedDef = await translateWithGoogleGTX(shortDef, 'ko');
    meaning = translatedDef || shortDef;
  }

  // Enforce Korean Part-of-Speech accuracy (e.g. verb -> ~하다/~다, adj -> ~한/~적인)
  if (meaning) {
    meaning = await formatKoreanMeaningByPOS(cleanWord, meaning, detectedPos, detectedPosList);
  }

  if (!exampleSentence && dictData.example && isHighQualityAcademicSentence(dictData.example, cleanWord)) {
    exampleSentence = dictData.example;
  }

  // 4. If still no example sentence, compose a grammatical contextual TOEFL sentence using part of speech
  if (!exampleSentence) {
    exampleSentence = composeContextualToeflSentence(cleanWord, detectedPos);
  }

  // 5. Translate the English example sentence naturally into Korean
  if (exampleSentence && (!exampleTranslation || isGenericTemplateTranslation(exampleTranslation, cleanWord))) {
    exampleTranslation = await translateWithGoogleGTX(exampleSentence, 'ko');
  }

  return {
    word: cleanWord,
    meaning: meaning || dictData.definition || '',
    exampleSentence: exampleSentence,
    exampleTranslation: exampleTranslation
  };
}

// Automatically repair any words previously saved with placeholder "주요 학술 단어", POS mismatch, or generic template sentences
async function repairPlaceholderMeanings() {
  const brokenWords = state.words.filter(
    w =>
      !w.meaning ||
      w.meaning === '주요 학술 단어' ||
      isPosMismatchMeaning(w.word, w.meaning) ||
      isGenericTemplateSentence(w.exampleSentence) ||
      isGenericTemplateTranslation(w.exampleTranslation, w.word)
  );

  let repairedCount = 0;
  for (const wordObj of brokenWords) {
    const res = await fetchAutoMeaningAndExample(wordObj.word);
    if (res) {
      let updated = false;
      if (
        (!wordObj.meaning || wordObj.meaning === '주요 학술 단어' || isPosMismatchMeaning(wordObj.word, wordObj.meaning)) &&
        res.meaning &&
        res.meaning !== '주요 학술 단어'
      ) {
        wordObj.meaning = res.meaning;
        updated = true;
      }
      if (res.exampleSentence && !isGenericTemplateSentence(res.exampleSentence)) {
        wordObj.exampleSentence = res.exampleSentence;
        updated = true;
      }
      if (res.exampleTranslation && !isGenericTemplateTranslation(res.exampleTranslation, wordObj.word)) {
        wordObj.exampleTranslation = res.exampleTranslation;
        updated = true;
      }

      if (updated) {
        saveEditedWordMap(wordObj.id, wordObj);
        if (state.isCloudSynced && typeof cloudAddCustomWord === 'function') {
          cloudAddCustomWord(wordObj);
        }
        repairedCount++;
      }
    }
  }

  // Also sync any custom words that were upgraded synchronously by sanitizeExampleSentence()
  if (state.isCloudSynced && typeof cloudPushAllCustomWords === 'function') {
    const customWordsInState = state.words
      .filter(w => String(w.id || '').startsWith('user_'))
      .map(w => ({
        id: w.id,
        word: w.word,
        meaning: w.meaning,
        example_sentence: w.exampleSentence || '',
        example_translation: w.exampleTranslation || '',
        created_at: w.created_at || new Date().toISOString()
      }));
    if (customWordsInState.length > 0) {
      cloudPushAllCustomWords(customWordsInState);
    }
  }

  if (repairedCount > 0) {
    try {
      const custom = JSON.parse(localStorage.getItem(STORAGE_KEY_ADDED) || '[]');
      let customUpdated = false;
      custom.forEach(item => {
        const fixed = state.words.find(w => w.id === item.id);
        if (fixed) {
          item.meaning = fixed.meaning;
          item.exampleSentence = fixed.exampleSentence;
          item.exampleTranslation = fixed.exampleTranslation;
          customUpdated = true;
        }
      });
      if (customUpdated) {
        localStorage.setItem(STORAGE_KEY_ADDED, JSON.stringify(custom));
      }
    } catch (e) {}

    updateUI();
  }
}

// --- Tab 3: Form Handler for Adding Words ---
async function handleAddWordSubmit(e) {
  e.preventDefault();

  const wordInput = document.getElementById('inputWord');
  const meaningInput = document.getElementById('inputMeaning');
  const btnSubmit = document.getElementById('btnSubmitWord');

  const wordVal = wordInput ? wordInput.value.trim() : '';
  if (!wordVal) return;

  // 1. Check duplicate word
  const isDuplicate = state.words.some(w => w.word.toLowerCase().trim() === wordVal.toLowerCase());
  if (isDuplicate) {
    showToast(`⚠️ "${wordVal}" 은(는) 이미 등록된 단어입니다!`);
    return;
  }

  if (btnSubmit) btnSubmit.disabled = true;

  try {
    // 2. Check valid English word (typo check)
    showToast(`⏳ "${wordVal}" 단어 스펠링 확인 중...`);
    const valid = await isValidEnglishWord(wordVal);
    if (!valid) {
      showToast(`⚠️ "${wordVal}" 은(는) 올바르지 않거나 존재하지 않는 영단어(오타)입니다!`);
      return;
    }

    let meaningVal = meaningInput ? meaningInput.value.trim() : '';
    let exampleVal = '';
    let exampleTrans = '';

    // Auto fetch meaning and authentic example sentence
    showToast(`⏳ "${wordVal}" 뜻/예문 자동 생성 중...`);
    const autoResult = await fetchAutoMeaningAndExample(wordVal);
    if (!meaningVal) {
      if (autoResult && autoResult.meaning) {
        meaningVal = autoResult.meaning;
      } else {
        showToast('⚠️ 뜻을 자동으로 가져오지 못했습니다. 뜻을 직접 입력해주세요.');
        return;
      }
    }
    if (autoResult && autoResult.exampleSentence) {
      exampleVal = autoResult.exampleSentence;
      exampleTrans = autoResult.exampleTranslation || '';
    }

    // Fallback to template if example is still empty
    if (!exampleVal) {
      const exObj = getExampleSentenceAndTranslation(wordVal, meaningVal);
      exampleVal = exObj.sentence;
      exampleTrans = exObj.translation;
    }

    const id = `user_${Date.now()}_${wordVal.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    const newWordObj = {
      id,
      word: wordVal,
      meaning: meaningVal,
      exampleSentence: exampleVal,
      exampleTranslation: exampleTrans,
      isFavorite: false,
      isKnown: false,
      status: 'unseen'
    };

    state.words.unshift(newWordObj);
    // Push to end of allCardStack so the newly added word appears immediately as the top card
    state.allCardStack.push(newWordObj);

    saveCustomWords(newWordObj);

    try {
      fetch('/api/add-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: wordVal, meaning: meaningVal })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          console.log('[App] Appended new word directly to local word.csv!');
        }
      }).catch(() => {});
    } catch(e) {}

    if (state.isCloudSynced && typeof cloudAddCustomWord === 'function') {
      cloudAddCustomWord(newWordObj);
    }

    if (wordInput) wordInput.value = '';
    if (meaningInput) meaningInput.value = '';

    showToast(`✨ "${wordVal}" (${meaningVal}) 단어가 추가되었습니다!`);

    updateUI();
    switchTab('tabAll');
  } finally {
    if (btnSubmit) btnSubmit.disabled = false;
  }
}

// --- Export CSV Handler ---
function handleExportCSV() {
  let csvContent = '영단어,뜻\n';
  state.words.forEach(w => {
    const cleanWord = w.word.includes(',') ? `"${w.word.replace(/"/g, '""')}"` : w.word;
    const cleanMeaning = w.meaning.includes(',') ? `"${w.meaning.replace(/"/g, '""')}"` : w.meaning;
    csvContent += `${cleanWord},${cleanMeaning}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'word.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('최신 word.csv 다운로드 완료! 📥');
}

// --- Utilities & Text-To-Speech ---
function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    showToast('음성 지원이 불가능한 브라우저입니다.');
  }
}

let toastTimeoutId = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }

  msgEl.textContent = msg;
  toast.classList.add('show');

  toastTimeoutId = setTimeout(() => {
    toast.classList.remove('show');
    toastTimeoutId = null;
  }, 2600);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Silent Background Auto-Sync across devices
async function syncCloudStateSilently() {
  if (!state.isCloudSynced || state.isSwipingCard) return;
  try {
    const cloudFavs = typeof cloudFetchFavorites === 'function' ? await cloudFetchFavorites() : null;
    const cloudKnown = typeof cloudFetchKnownWords === 'function' ? await cloudFetchKnownWords() : null;

    let updated = false;
    if (cloudFavs) {
      cloudFavs.forEach(id => {
        if (!state.favorites.has(id)) {
          state.favorites.add(id);
          updated = true;
        }
      });
    }

    if (cloudKnown) {
      cloudKnown.forEach(id => {
        if (!state.knownWords.has(id)) {
          state.knownWords.add(id);
          updated = true;
        }
      });
    }

    if (updated) {
      saveFavorites();
      saveKnownWords();
      state.words.forEach(w => {
        w.isFavorite = state.favorites.has(w.id);
        w.isKnown = state.knownWords.has(w.id);
        w.status = w.isKnown ? 'known' : 'unseen';
      });

      const unmemorizedWords = state.words.filter(w => !state.knownWords.has(w.id));
      state.allCardStack = shuffleArray(unmemorizedWords);
      state.favCardStack = shuffleArray(state.words.filter(w => state.favorites.has(w.id)));

      updateUI();
    }
  } catch (e) {}
}

window.addEventListener('focus', syncCloudStateSilently);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    syncCloudStateSilently();
  }
});
