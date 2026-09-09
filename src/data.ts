import type { LangId } from "./brand";

export type Motif = "lotus" | "chariot" | "flute" | "conch" | "wheel" | "tree" | "lamp" | "peacock";

export type Chapter = {
  number: number;
  sa: string;
  saTitle: string;
  en: string;
  enTitle: string;
  verses: number;
  description: string;
  accent: string;
  motif: Motif;
};

export type Verse = {
  chapter: number;
  verse: number;
  sa: string;
  iast: string;
  en: string;
  ta: string;
  hi: string;
  te?: string;
  kn?: string;
  ml?: string;
  bn?: string;
  mr?: string;
  gu?: string;
  reflection?: string;
};

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    sa: "अर्जुनविषादयोगः",
    saTitle: "Arjuna Vishada Yoga",
    en: "The Yoga of Arjuna’s Grief",
    enTitle: "Arjuna Vishada Yoga",
    verses: 47,
    description: "On the field of dharma, Arjuna’s bow falls. The dialogue begins in sorrow.",
    accent: "#1C2740",
    motif: "chariot",
  },
  {
    number: 2,
    sa: "साङ्ख्ययोगः",
    saTitle: "Sankhya Yoga",
    en: "The Yoga of Knowledge",
    enTitle: "Sankhya Yoga",
    verses: 72,
    description: "Krishna opens the teaching: the Self is unborn, duty is yours, fruits are not.",
    accent: "#243A6B",
    motif: "lotus",
  },
  {
    number: 3,
    sa: "कर्मयोगः",
    saTitle: "Karma Yoga",
    en: "The Yoga of Action",
    enTitle: "Karma Yoga",
    verses: 43,
    description: "Act without clinging. The world is held by work offered, not by retreat.",
    accent: "#8A4A1C",
    motif: "wheel",
  },
  {
    number: 4,
    sa: "ज्ञानकर्मसंन्यासयोगः",
    saTitle: "Jnana Karma Sannyasa Yoga",
    en: "Knowledge and the Renunciation of Action",
    enTitle: "Jnana Karma Sannyasa Yoga",
    verses: 42,
    description: "Whenever dharma declines, the Divine is born. Wisdom burns the bonds of work.",
    accent: "#1A3A7A",
    motif: "lamp",
  },
  {
    number: 5,
    sa: "कर्मसंन्यासयोगः",
    saTitle: "Karma Sannyasa Yoga",
    en: "The Yoga of Renunciation",
    enTitle: "Karma Sannyasa Yoga",
    verses: 29,
    description: "Renunciation and yoga of action are one when the heart is even.",
    accent: "#3E2A18",
    motif: "lotus",
  },
  {
    number: 6,
    sa: "ध्यानयोगः",
    saTitle: "Dhyana Yoga",
    en: "The Yoga of Meditation",
    enTitle: "Dhyana Yoga",
    verses: 47,
    description: "Lift the self by the self. A quiet seat, a steady mind, a friendly heart.",
    accent: "#2C4A3A",
    motif: "tree",
  },
  {
    number: 7,
    sa: "ज्ञानविज्ञानयोगः",
    saTitle: "Jnana Vijnana Yoga",
    en: "Knowledge and Realisation",
    enTitle: "Jnana Vijnana Yoga",
    verses: 30,
    description: "There is nothing higher than this. The many are strung on the One.",
    accent: "#4A2A48",
    motif: "flute",
  },
  {
    number: 8,
    sa: "अक्षरब्रह्मयोगः",
    saTitle: "Akshara Brahma Yoga",
    en: "The Imperishable Brahman",
    enTitle: "Akshara Brahma Yoga",
    verses: 28,
    description: "At the hour of leaving, remember. The syllable, the path, the unfading.",
    accent: "#1C3048",
    motif: "conch",
  },
  {
    number: 9,
    sa: "राजविद्याराजगुह्ययोगः",
    saTitle: "Raja Vidya Raja Guhya Yoga",
    en: "The Royal Knowledge and the Royal Secret",
    enTitle: "Raja Vidya Raja Guhya Yoga",
    verses: 34,
    description: "A leaf, a flower, a fruit, a little water — offered with love, received.",
    accent: "#6B2E1A",
    motif: "lotus",
  },
  {
    number: 10,
    sa: "विभूतियोगः",
    saTitle: "Vibhuti Yoga",
    en: "The Yoga of Divine Glories",
    enTitle: "Vibhuti Yoga",
    verses: 42,
    description: "Among lights, the sun. Among words, the sacred syllable. Among peaks, Meru.",
    accent: "#1E3A5C",
    motif: "peacock",
  },
  {
    number: 11,
    sa: "विश्वरूपदर्शनयोगः",
    saTitle: "Vishwarupa Darshana Yoga",
    en: "The Vision of the Universal Form",
    enTitle: "Vishwarupa Darshana Yoga",
    verses: 55,
    description: "Arjuna sees time itself — mouths of fire, worlds entering, a bow that trembles.",
    accent: "#2A1C40",
    motif: "wheel",
  },
  {
    number: 12,
    sa: "भक्तियोगः",
    saTitle: "Bhakti Yoga",
    en: "The Yoga of Devotion",
    enTitle: "Bhakti Yoga",
    verses: 20,
    description: "Free of hate, friendly to all, even-minded in praise and blame — this is dear.",
    accent: "#7A3A2A",
    motif: "lotus",
  },
  {
    number: 13,
    sa: "क्षेत्रक्षेत्रज्ञविभागयोगः",
    saTitle: "Kshetra Kshetrajna Vibhaga Yoga",
    en: "The Field and the Knower of the Field",
    enTitle: "Kshetra Kshetrajna Yoga",
    verses: 34,
    description: "This body is the field. The one who knows it is the knower. Knowledge is their union.",
    accent: "#2A3A28",
    motif: "tree",
  },
  {
    number: 14,
    sa: "गुणत्रयविभागयोगः",
    saTitle: "Gunatraya Vibhaga Yoga",
    en: "The Three Gunas",
    enTitle: "Gunatraya Vibhaga Yoga",
    verses: 27,
    description: "Sattva, rajas, tamas bind. Beyond the three, the Self is not stained.",
    accent: "#3A2C18",
    motif: "lamp",
  },
  {
    number: 15,
    sa: "पुरुषोत्तमयोगः",
    saTitle: "Purushottama Yoga",
    en: "The Supreme Person",
    enTitle: "Purushottama Yoga",
    verses: 20,
    description: "An inverted tree, roots above. The Lord seated in the heart of all.",
    accent: "#1A3A32",
    motif: "tree",
  },
  {
    number: 16,
    sa: "दैवासुरसम्पद्विभागयोगः",
    saTitle: "Daivasura Sampad Vibhaga Yoga",
    en: "Divine and Demonic Natures",
    enTitle: "Daivasura Sampad Yoga",
    verses: 24,
    description: "Fearlessness, truth, restraint — the divine wealth. Pride and cruelty, the other path.",
    accent: "#2C2448",
    motif: "conch",
  },
  {
    number: 17,
    sa: "श्रद्धात्रयविभागयोगः",
    saTitle: "Shraddhatraya Vibhaga Yoga",
    en: "The Threefold Faith",
    enTitle: "Shraddhatraya Vibhaga Yoga",
    verses: 28,
    description: "Faith, food, gift, and austerity follow the three gunas. Om Tat Sat.",
    accent: "#4A3020",
    motif: "lamp",
  },
  {
    number: 18,
    sa: "मोक्षसंन्यासयोगः",
    saTitle: "Moksha Sannyasa Yoga",
    en: "Liberation and Renunciation",
    enTitle: "Moksha Sannyasa Yoga",
    verses: 78,
    description: "Leave every lesser refuge. Come to this one. Where Krishna and Arjuna stand, there is victory.",
    accent: "#1C2740",
    motif: "chariot",
  },
];

export const VERSES: Verse[] = [
  {
    chapter: 1,
    verse: 1,
    sa: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
    iast: "dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ||",
    en: "On the field of dharma, on Kurukshetra, gathered and eager for battle — what did my sons and the sons of Pandu do, O Sanjaya?",
    ta: "தருமக் களத்தில், குருக்ஷேத்திரத்தில், போருக்கு ஒன்றுகூடியவர்கள் — என் மக்களும் பாண்டவர்களும் என்ன செய்தனர், சஞ்சயா?",
    hi: "धर्मक्षेत्र कुरुक्षेत्र में युद्ध के लिये एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया, हे संजय?",
    reflection: "The Gita opens not with a sermon, but with a question on a field named for dharma.",
  },
  {
    chapter: 1,
    verse: 21,
    sa: "सेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत।",
    iast: "senayor ubhayor madhye rathaṁ sthāpaya me ’cyuta |",
    en: "Place my chariot, O Acyuta, between the two armies.",
    ta: "அசைவற்றவனே, இரு படைகளின் நடுவே என் தேரை நிறுத்து.",
    hi: "हे अच्युत, दोनों सेनाओं के बीच मेरा रथ खड़ा करो।",
  },
  {
    chapter: 1,
    verse: 28,
    sa: "दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्।\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति॥",
    iast: "dṛṣṭvemaṁ sva-janaṁ kṛṣṇa yuyutsuṁ samupasthitam |\nsīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati ||",
    en: "Seeing my own people, Krishna, standing ready to fight, my limbs fail and my mouth goes dry.",
    ta: "கிருஷ்ணா, போருக்கு நிற்கும் உறவினரைக் கண்டு என் உறுப்புகள் தளர்கின்றன; வாய் உலர்கிறது.",
    hi: "हे कृष्ण, युद्ध के लिये खड़े स्वजनों को देखकर मेरे अंग शिथिल होते हैं और मुख सूख जाता है।",
  },
  {
    chapter: 1,
    verse: 47,
    sa: "एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥",
    iast: "evam uktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ ||",
    en: "Having spoken thus in the midst of battle, Arjuna sat down on the chariot, letting fall his bow and arrows, his mind shaken by grief.",
    ta: "இவ்வாறு சொல்லி, அர்ஜுனன் தேரில் அமர்ந்தான்; வில்லையும் அம்புகளையும் கீழே இட்டு, சோகத்தால் மனம் நடுங்கினான்.",
    hi: "यह कहकर अर्जुन रथ के आसन पर बैठ गया, धनुष-बाण छोड़कर, शोक से व्याकुल मनवाला।",
  },
  {
    chapter: 2,
    verse: 1,
    sa: "तं तथा कृपयाविष्टमश्रुपूर्णाकुलेक्षणम्।\nविषीदन्तमिदं वाक्यमुवाच मधुसूदनः॥",
    iast: "taṁ tathā kṛpayāviṣṭam aśru-pūrṇākulekṣaṇam |\nviṣīdantam idaṁ vākyam uvāca madhusūdanaḥ ||",
    en: "To him, overcome with pity, eyes filled and restless with tears, sinking in despair, Madhusudana spoke these words.",
    ta: "கருணையால் நிறைந்து, கண்ணீர் நிறைந்த கண்களுடன் வருந்தும் அவனிடம் மதுசூதனன் இவ்வாறு கூறினான்.",
    hi: "उस करुणाविष्ट, अश्रुपूरित विकल नेत्रों वाले विषादयुक्त अर्जुन से मधुसूदन ने यह वचन कहा।",
  },
  {
    chapter: 2,
    verse: 2,
    sa: "कुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्।\nअनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन॥",
    iast: "kutas tvā kaśmalam idaṁ viṣame samupasthitam |\nanārya-juṣṭam asvargyam akīrti-karam arjuna ||",
    en: "Whence has this faintness come upon you in this hour of crisis, Arjuna? It is not the way of the noble, it does not lead to heaven, it brings no honour.",
    ta: "இந்த இக்கட்டில் இந்த மயக்கம் உனக்கு எங்கிருந்து வந்தது, அர்ஜுனா? இது உயர்ந்தோர் வழியன்று; விண்ணுலகிற்கும் புகழிற்கும் ஆகாது.",
    hi: "हे अर्जुन, इस विषम समय में तुम्हें यह कायरता कहाँ से आ गई? यह श्रेष्ठ जनों का मार्ग नहीं, स्वर्ग का भी नहीं, कीर्ति का भी नहीं।",
  },
  {
    chapter: 2,
    verse: 3,
    sa: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप॥",
    iast: "klaibyaṁ mā sma gamaḥ pārtha naitat tvayy upapadyate |\nkṣudraṁ hṛdaya-daurbalyaṁ tyaktvottiṣṭha parantapa ||",
    en: "Do not yield to impotence, O Partha. It does not become you. Cast off this petty weakness of heart and stand up, O scorcher of foes.",
    ta: "பர்த்தா, புண்மைக்கு இடங்கொடாதே; இது உனக்கு ஏலாது. சிறிய இதயப் பலவீனத்தை விட்டு எழு, பகை வெல்லுமவனே.",
    hi: "हे पार्थ, नपुंसकता को मत प्राप्त हो। यह तुम्हें शोभा नहीं देता। हृदय की इस क्षुद्र दुर्बलता को छोड़कर खड़े हो जाओ, हे परंतप।",
  },
  {
    chapter: 2,
    verse: 4,
    sa: "कथं भीष्ममहं सङ्ख्ये द्रोणं च मधुसूदन।\nइषुभिः प्रतियोत्स्यामि पूजार्हावरिसूदन॥",
    iast: "kathaṁ bhīṣmam ahaṁ saṅkhye droṇaṁ ca madhusūdana |\niṣubhiḥ pratiyotsyāmi pūjārhāv arisūdana ||",
    en: "How can I strike Bhishma and Drona in battle with arrows, O Madhusudana? They are worthy of worship, O slayer of enemies.",
    ta: "மதுசூதனா, போரில் பீஷ்மரையும் திரோணரையும் அம்புகளால் எவ்வாறு எதிர்ப்பேன்? அவர்கள் வணக்கத்திற்குரியோர்.",
    hi: "हे मधुसूदन, मैं युद्ध में भीष्म और द्रोण पर बाण कैसे चलाऊँ? वे पूजनीय हैं, हे अरिसूदन।",
  },
  {
    chapter: 2,
    verse: 7,
    sa: "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्॥",
    iast: "kārpaṇya-doṣopahata-svabhāvaḥ pṛcchāmi tvāṁ dharma-sammūḍha-cetāḥ |\nyac chreyaḥ syān niścitaṁ brūhi tan me śiṣyas te ’haṁ śādhi māṁ tvāṁ prapannam ||",
    en: "My nature is struck down by the fault of pity. My mind is confused about dharma. Tell me clearly what is better. I am your student. Teach me, I have come to you.",
    ta: "பரிதாபக் குற்றத்தால் இயல்பு தளர்ந்து, தருமத்தில் மயங்கியுள்ளேன். எது நன்மையோ அதைத் தெளிவாகச் சொல். நான் உன் சீடன்; உனக்கு அடைக்கலம் புகுந்தேன், என்னை நடத்து.",
    hi: "कायरता से स्वभाव नष्ट हो गया है, धर्म में मोहित चित्त हूँ। जो निश्चित कल्याण हो, वह कहो। मैं तुम्हारा शिष्य हूँ, मुझ शरणागत को शिक्षा दो।",
  },
  {
    chapter: 2,
    verse: 11,
    sa: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥",
    iast: "aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase |\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ ||",
    en: "You grieve for those who should not be grieved, and you speak words of wisdom. The wise do not mourn the dead or the living.",
    ta: "வருந்தத் தகாதவர் மேல் வருந்துகிறாய்; அறிவுரைகளையும் பேசுகிறாய். உயிர் நீங்கியோரையும் உயிருள்ளோரையும் அறிஞர் துன்புறார்.",
    hi: "तुम न शोक करने योग्य पर शोक करते हो और ज्ञान की बातें कहते हो। पण्डित न गए प्राणों पर शोक करते हैं, न रहने वाले प्राणों पर।",
  },
  {
    chapter: 2,
    verse: 13,
    sa: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥",
    iast: "dehino ’smin yathā dehe kaumāraṁ yauvanaṁ jarā |\ntathā dehāntara-prāptir dhīras tatra na muhyati ||",
    en: "As the embodied one passes in this body from childhood to youth to age, so it passes to another body. The steady one is not bewildered by this.",
    ta: "உடலுள்ளவன் இந்த உடலில் குழந்தை, இளமை, முதுமை எனச் செல்வது போலவே வேறு உடலை அடைகிறான். அதில் தீரன் மயங்கமாட்டான்.",
    hi: "जैसे देही इस देह में बालकपन, युवावस्था और वृद्धावस्था को प्राप्त होता है, वैसे ही दूसरे शरीर को। धीर पुरुष वहाँ मोहित नहीं होता।",
  },
  {
    chapter: 2,
    verse: 14,
    sa: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    iast: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino ’nityās tāṁs titikṣasva bhārata ||",
    en: "Contacts of the senses, O son of Kunti, bring cold and heat, pleasure and pain. They come and go; they are not lasting. Endure them, O Bharata.",
    ta: "குந்தியின் மைந்தா, புலன் தொடுகைகள் குளிரும் வெயிலும் இன்பமும் துன்பமும் தரும். அவை வந்து போவன, நிலையற்றன. அவற்றைப் பொறு, பாரதா.",
    hi: "हे कौन्तेय, इन्द्रिय-स्पर्श शीत-उष्ण सुख-दुःख देने वाले हैं। आने-जाने वाले, अनित्य हैं। उन्हें सहो, हे भारत।",
    reflection: "What visits the skin is weather. What you are is not the weather.",
  },
  {
    chapter: 2,
    verse: 20,
    sa: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
    iast: "na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato ’yaṁ purāṇo na hanyate hanyamāne śarīre ||",
    en: "It is never born, it never dies. Having been, it will not cease to be. Unborn, eternal, everlasting, ancient — it is not slain when the body is slain.",
    ta: "இது ஒருபோதும் பிறப்பதில்லை, இறப்பதில்லை. இருந்து மீண்டும் இல்லாமல் ஆவதில்லை. பிறவாதது, நித்தியம், சாசுவதம், புராதனம் — உடல் கொல்லப்பட்டாலும் இது கொல்லப்படுவதில்லை.",
    hi: "यह कभी जन्म नहीं लेता, मरता नहीं। होकर फिर नहीं होने वाला नहीं। अजन्मा, नित्य, शाश्वत, पुराण — शरीर के मारे जाने पर यह नहीं मारा जाता।",
  },
  {
    chapter: 2,
    verse: 22,
    sa: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
    iast: "vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro ’parāṇi |\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī ||",
    en: "As a person casts off worn clothes and puts on new ones, so the embodied one casts off worn bodies and enters others that are new.",
    ta: "மனிதன் பழைய ஆடைகளைக் களைந்து புதியவை அணிவது போல, உடலுள்ளவன் பழைய உடல்களை விட்டுப் புதியவற்றில் செல்கிறான்.",
    hi: "जैसे मनुष्य जीर्ण वस्त्र छोड़कर दूसरे नए वस्त्र धारण करता है, वैसे ही देही जीर्ण शरीरों को छोड़कर दूसरे नए शरीरों को प्राप्त होता है।",
  },
  {
    chapter: 2,
    verse: 47,
    sa: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    iast: "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi ||",
    en: "Your right is to perform your duty, never to its fruits. Do not let the fruits of action be your motive, and do not cling to inaction.",
    ta: "உனக்கு உரிமை செயலில் மட்டுமே — ஒருபோதும் அதன் பயனில் அல்ல. பயனை நோக்கமாகக் கொள்ளாதே; செய்யாதிருப்பதிலும் பற்று வேண்டாம்.",
    hi: "तुम्हारा अधिकार कर्म में है, फल में कभी नहीं। कर्मफल का हेतु मत बनो, और अकर्म में भी आसक्ति न हो।",
    te: "నీ అధికారం కర్మలోనే — ఫలాలపై ఎన్నడూ కాదు. ఫలాన్ని ఉద్దేశంగా చేసుకోవద్దు; అకర్మలోనూ ఆసక్తి ఉండకూడదు.",
    kn: "ನಿನ್ನ ಅಧಿಕಾರ ಕರ್ಮದಲ್ಲಿಯೇ, ಫಲಗಳಲ್ಲಿ ಎಂದಿಗೂ ಅಲ್ಲ. ಫಲವನ್ನು ಉದ್ದೇಶವನ್ನಾಗಿ ಮಾಡಿಕೊಳ್ಳಬೇಡ; ಅಕರ್ಮದಲ್ಲಿಯೂ ಆಸಕ್ತಿ ಬೇಡ.",
    ml: "നിനക്ക് അവകാശം കർമത്തിൽ മാത്രം — ഫലങ്ങളിൽ ഒരിക്കലുമല്ല. ഫലം ലക്ഷ്യമാക്കരുത്; അകർമത്തിലും ആസക്തി വേണ്ട.",
    bn: "তোমার অধিকার কর্মতেই, ফলে কখনও নয়। কর্মফলের হেতু হয়ো না, আর অকর্মেও আসক্তি রেখো না।",
    mr: "तुझा अधिकार कर्मात आहे, फळात कधीही नाही. कर्मफळाचा हेतु होऊ नकोस, आणि अकर्मात आसक्तीही नको.",
    gu: "તારો અધિકાર કર્મમાં જ છે, ફળમાં ક્યારેય નહીં. કર્મફળનું કારણ ન બન, અને અકર્મમાં આસક્તિ ન રાખ.",
    reflection: "Do the work that is yours. Release the harvest. Stillness is not the same as refusal.",
  },
  {
    chapter: 2,
    verse: 48,
    sa: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
    iast: "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||",
    en: "Fixed in yoga, perform actions, having abandoned attachment, O Dhananjaya. Be even in success and failure. Evenness is called yoga.",
    ta: "யோகத்தில் நிலைத்து, பற்றை விட்டுச் செயல்களைச் செய், தனஞ்சயா. வெற்றியிலும் தோல்வியிலும் சமனாயிரு. சமநிலையே யோகம் எனப்படும்.",
    hi: "योग में स्थित होकर आसक्ति त्यागकर कर्म करो, हे धनञ्जय। सिद्धि और असिद्धि में सम होकर — समत्व ही योग कहा जाता है।",
  },
  {
    chapter: 2,
    verse: 50,
    sa: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥",
    iast: "buddhi-yukto jahātīha ubhe sukṛta-duṣkṛte |\ntasmād yogāya yujyasva yogaḥ karmasu kauśalam ||",
    en: "One joined to this wisdom casts off both good and ill deeds here. Therefore yoke yourself to yoga. Yoga is skill in action.",
    ta: "இந்த அறிவுடன் கூடியவன் இங்கே நல்வினையையும் தீவினையையும் விடுகிறான். ஆகையால் யோகத்தில் இணை. யோகம் செயல்களில் திறன்.",
    hi: "बुद्धियुक्त पुरुष यहाँ शुभ और अशुभ दोनों कर्मों को छोड़ देता है। इसलिये योग के लिये युक्त हो। योग कर्मों में कुशलता है।",
  },
  {
    chapter: 2,
    verse: 56,
    sa: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
    iast: "duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ |\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate ||",
    en: "Whose mind is unshaken in sorrow, who has no craving in pleasure, who is free of longing, fear and anger — that one of steady wisdom is called a sage.",
    ta: "துன்பத்தில் மனம் அலையாதவன், இன்பத்தில் ஆசை நீங்கியவன், பற்று அச்சம் சினம் இல்லாதவன் — நிலைத்த அறிவுள்ளவன் முனி எனப்படுவான்.",
    hi: "दुःखों में जिसका मन उद्विग्न नहीं, सुखों में स्पृहा रहित, राग-भय-क्रोध से रहित — वह स्थिरबुद्धि मुनि कहा जाता है।",
  },
  {
    chapter: 2,
    verse: 72,
    sa: "एषा ब्राह्मी स्थितिः पार्थ नैनां प्राप्य विमुह्यति।\nस्थित्वास्यामन्तकालेऽपि ब्रह्मनिर्वाणमृच्छति॥",
    iast: "eṣā brāhmī sthitiḥ pārtha naināṁ prāpya vimuhyati |\nsthitvāsyām anta-kāle ’pi brahma-nirvāṇam ṛcchati ||",
    en: "This is the Brahmi state, O Partha. Attaining it, one is not deluded. Established in it even at the last hour, one reaches the peace of Brahman.",
    ta: "இதுவே பிரம்ம நிலை, பர்த்தா. இதை அடைந்தவன் மயங்கமாட்டான். இறுதி நேற்றிலும் இதில் நிலைத்தவன் பிரம நிர்வாணத்தை அடைவான்.",
    hi: "यह ब्राह्मी स्थिति है, हे पार्थ। इसे पाकर मोहित नहीं होता। अन्तकाल में भी इसमें स्थित पुरुष ब्रह्मनिर्वाण को प्राप्त होता है।",
  },
  {
    chapter: 3,
    verse: 8,
    sa: "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।\nशरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः॥",
    iast: "niyataṁ kuru karma tvaṁ karma jyāyo hy akarmaṇaḥ |\nśarīra-yātrāpi ca te na prasidhyed akarmaṇaḥ ||",
    en: "Do the work that is appointed. Action is better than inaction. Even the journey of the body would not succeed through inaction.",
    ta: "விதிக்கப்பட்ட செயலைச் செய். செயல் செய்யாமையிலும் மேல். செய்யாவிடில் உடலின் பயணமே நடவாது.",
    hi: "निर्धारित कर्म करो। कर्म अकर्म से श्रेष्ठ है। अकर्म से शरीर-यात्रा भी नहीं चलती।",
  },
  {
    chapter: 3,
    verse: 19,
    sa: "तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
    iast: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||",
    en: "Therefore, unattached, always perform the work that must be done. The person who acts without clinging reaches the Highest.",
    ta: "ஆகையால் பற்றின்றி எப்போதும் செய்யவேண்டிய செயலைச் செய். பற்றின்றிச் செய்பவன் உயர்ந்ததை அடைவான்.",
    hi: "इसलिये आसक्ति रहित होकर सदा कर्तव्य कर्म करो। आसक्ति रहित कर्म करता हुआ पुरुष परम को प्राप्त होता है।",
  },
  {
    chapter: 3,
    verse: 30,
    sa: "मयि सर्वाणि कर्माणि संन्यस्याध्यात्मचेतसा।\nनिराशीर्निर्ममो भूत्वा युध्यस्व विगतज्वरः॥",
    iast: "mayi sarvāṇi karmāṇi sannyasyādhyātma-cetasā |\nnirāśīr nirmamo bhūtvā yudhyasva vigata-jvaraḥ ||",
    en: "Surrendering all actions to Me with a mind on the Self, without hope, without possessiveness, fight — free of fever.",
    ta: "ஆத்ம சிந்தையுடன் எல்லாச் செயல்களையும் என்னிடம் சமர்ப்பித்து, ஆசையின்றி, ‘எனது’ என்னும் எண்ணமின்றி, சுரமின்றி போரிடு.",
    hi: "अध्यात्म चित्त से सब कर्म मुझमें संन्यास करके, आशा रहित, ममता रहित, ज्वर रहित होकर युद्ध करो।",
  },
  {
    chapter: 4,
    verse: 7,
    sa: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    iast: "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||",
    en: "Whenever dharma declines, O Bharata, and adharma rises, then I bring forth myself.",
    ta: "தருமம் தளரும் போதெல்லாம், பாரதா, அதர்மம் எழும் போதெல்லாம், அப்போது நான் என்னைத் தோற்றுவிக்கிறேன்.",
    hi: "जब-जब धर्म की हानि होती है, हे भारत, और अधर्म की वृद्धि, तब-तब मैं स्वयं को प्रकट करता हूँ।",
  },
  {
    chapter: 4,
    verse: 8,
    sa: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
    iast: "paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām |\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge ||",
    en: "For the protection of the good, for the destruction of those who do harm, and for the establishing of dharma, I am born age after age.",
    ta: "நல்லோரைக் காக்கவும், தீயோரை அழிக்கவும், தருமத்தை நிலைநிறுத்தவும், யுகம் தோறும் நான் தோன்றுகிறேன்.",
    hi: "साधुओं के परित्राण के लिये, दुष्कृतों के विनाश के लिये, धर्म की स्थापना के लिये मैं युग-युग में प्रकट होता हूँ।",
  },
  {
    chapter: 4,
    verse: 38,
    sa: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
    iast: "na hi jñānena sadṛśaṁ pavitram iha vidyate |\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||",
    en: "Nothing in this world is as purifying as knowledge. One perfected in yoga finds it in the self, in time.",
    ta: "இங்கே ஞானத்திற்கு நிகரான தூய்மை இல்லை. யோகத்தில் சித்தி பெற்றவன் காலத்தால் அதைத் தன்னில் காண்பான்.",
    hi: "इस लोक में ज्ञान के समान पवित्र कुछ नहीं। योग में सिद्ध पुरुष उसे स्वयं काल से आत्मा में पाता है।",
  },
  {
    chapter: 5,
    verse: 10,
    sa: "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥",
    iast: "brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā ||",
    en: "Who places actions in Brahman and works without clinging is not stained by wrong, as a lotus leaf is not stained by water.",
    ta: "செயல்களைப் பிரமத்தில் வைத்து, பற்றின்றிச் செய்பவன் பாவத்தால் ஒட்டான் — தாமரை இலை நீரில் ஒட்டாதது போல.",
    hi: "जो कर्मों को ब्रह्म में रखकर आसक्ति त्यागकर करता है, वह पाप से लिप्त नहीं होता — जैसे कमलपत्र जल से नहीं।",
  },
  {
    chapter: 6,
    verse: 5,
    sa: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    iast: "uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||",
    en: "Lift the self by the self. Do not let the self sink. The self is the friend of the self, and the self is the enemy of the self.",
    ta: "ஆன்மாவால் ஆன்மாவை உயர்த்து; ஆன்மாவைத் தாழ்த்தாதே. ஆன்மாவே ஆன்மாவின் நண்பன்; ஆன்மாவே ஆன்மாவின் பகைவன்.",
    hi: "आत्मा के द्वारा आत्मा को उद्धार करे, आत्मा को गिरने न दे। आत्मा ही आत्मा का बन्धु है, आत्मा ही आत्मा का रिपु है।",
  },
  {
    chapter: 6,
    verse: 26,
    sa: "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥",
    iast: "yato yato niścarati manaś cañcalam asthiram |\ntatas tato niyamyaitad ātmany eva vaśaṁ nayet ||",
    en: "Wherever the restless, unsteady mind wanders, from there bring it back and place it in the self alone.",
    ta: "அலையும் நிலையற்ற மனம் எங்கெங்கு சென்றாலும், அங்கிருந்து அடக்கி ஆன்மாவிலேயே வசப்படுத்து.",
    hi: "चंचल अस्थिर मन जहाँ-जहाँ निकलता है, वहाँ-वहाँ से रोककर इसे आत्मा में ही वश में लाए।",
  },
  {
    chapter: 7,
    verse: 7,
    sa: "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥",
    iast: "mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva ||",
    en: "There is nothing higher than Me, O Dhananjaya. All this is strung on Me as gems are strung on a thread.",
    ta: "என்னைவிட உயர்ந்தது வேறொன்றும் இல்லை, தனஞ்சயா. இவை எல்லாம் என்னில் கோக்கப்பட்டுள்ளன — நூலில் மணிகள் போல.",
    hi: "मुझसे परे कुछ नहीं है, हे धनञ्जय। यह सब मुझमें गुथा है जैसे सूत्र में मणियाँ।",
  },
  {
    chapter: 8,
    verse: 7,
    sa: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च।\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम्॥",
    iast: "tasmāt sarveṣu kāleṣu mām anusmara yudhya ca |\nmayy arpita-mano-buddhir mām evaiṣyasy asaṁśayam ||",
    en: "Therefore at all times remember Me and fight. With mind and intellect offered to Me, you will come to Me without doubt.",
    ta: "ஆகையால் எல்லா நேரங்களிலும் என்னை நினைத்துப் போரிடு. மனமும் அறிவும் என்னிடம் சமர்ப்பித்தவன் ஐயமின்றி என்னையே அடைவாய்.",
    hi: "इसलिये सब कालों में मेरा अनुस्मरण करो और युद्ध करो। मुझमें अर्पित मन-बुद्धि वाला निःसंदेह मुझे ही प्राप्त होगा।",
  },
  {
    chapter: 9,
    verse: 22,
    sa: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    iast: "ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||",
    en: "Those who worship Me, thinking of nothing else — for those always joined to Me, I carry what they need and what they have.",
    ta: "வேறொன்றும் நினையாது என்னை வழிபடுவோருக்கு — எப்போதும் இணைந்தவர்களுக்கு — யோகத்தையும் க்ஷேமத்தையும் நான் சுமக்கிறேன்.",
    hi: "अनन्य भाव से मेरा चिंतन करते हुए जो भजते हैं, उन नित्य युक्तों का योगक्षेम मैं वहन करता हूँ।",
  },
  {
    chapter: 9,
    verse: 26,
    sa: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
    iast: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati |\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||",
    en: "A leaf, a flower, a fruit, a little water — whoever offers it to Me with devotion, that gift of a pure heart I accept.",
    ta: "இலை, பூ, கனி, நீர் — பக்தியுடன் எனக்கு அளிப்பவனின் அந்தக் காணிக்கையை, தூய உள்ளத்தின் பக்திப் பரிசை, நான் ஏற்றுக்கொள்கிறேன்.",
    hi: "पत्र, पुष्प, फल, जल — जो भक्ति से मुझे देता है, उस प्रयत आत्मा की भक्ति से उपहृत वस्तु को मैं ग्रहण करता हूँ।",
  },
  {
    chapter: 10,
    verse: 20,
    sa: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः।\nअहमादिश्च मध्यं च भूतानामन्त एव च॥",
    iast: "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṁ ca bhūtānām anta eva ca ||",
    en: "I am the Self, O Gudakesha, seated in the heart of all beings. I am the beginning, the middle, and the end of beings.",
    ta: "குடாகேசா, நான் எல்லா உயிர்களின் இதயத்தில் அமர்ந்த ஆன்மா. உயிர்களின் தொடக்கம், நடு, முடிவு நான்.",
    hi: "हे गुडाकेश, मैं सब भूतों के हृदय में स्थित आत्मा हूँ। भूतों का आदि, मध्य और अन्त भी मैं ही हूँ।",
  },
  {
    chapter: 11,
    verse: 32,
    sa: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः।\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः॥",
    iast: "kālo ’smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ |\nṛte ’pi tvāṁ na bhaviṣyanti sarve ye ’vasthitāḥ pratyanīkeṣu yodhāḥ ||",
    en: "I am Time, the great destroyer of worlds, engaged here in gathering the worlds. Even without you, none of the warriors in the opposing ranks will remain.",
    ta: "நான் காலம் — உலகை அழிக்கும் வளர்ந்த காலம்; இங்கே உலகங்களை ஒடுக்க வந்துள்ளேன். நீ இல்லாவிட்டாலும் எதிர்ப் படையில் நிற்கும் வீரர் எவரும் இருக்கமாட்டார்.",
    hi: "मैं काल हूँ, लोकों का क्षय करने वाला बढ़ा हुआ, यहाँ लोकों को संहार करने में प्रवृत्त। तुम्हारे बिना भी प्रतिकूल सेना के सब योद्धा नहीं रहेंगे।",
  },
  {
    chapter: 12,
    verse: 13,
    sa: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
    iast: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||",
    en: "Without hatred for any being, friendly and compassionate, without ‘mine’, without ego, even in pain and pleasure, patient —",
    ta: "எவ்வுயிரிடமும் வெறுப்பின்றி, நட்பும் கருணையும் உடையவன், ‘எனது’ என்னும் செருக்கின்றி, துன்ப இன்பத்தில் சமன், பொறுமையுள்ளவன் —",
    hi: "सब भूतों से द्वेष रहित, मैत्री और करुणा वाला, ममता रहित, अहंकार रहित, सुख-दुःख में सम, क्षमावान् —",
  },
  {
    chapter: 12,
    verse: 14,
    sa: "सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥",
    iast: "santuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ |\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ ||",
    en: "Always content, a yogi, self-restrained, of firm resolve, with mind and intellect offered to Me — that devotee is dear to Me.",
    ta: "எப்போதும் திருப்தி, யோகி, ஆன்மா அடங்கியவன், உறுதி கொண்டவன், மனமும் அறிவும் என்னிடம் சமர்ப்பித்தவன் — அந்த அடியான் எனக்கு இனியன்.",
    hi: "सदा संतुष्ट योगी, यतात्मा, दृढ़ निश्चय वाला, मुझमें अर्पित मन-बुद्धि — जो मेरा भक्त है, वह मुझे प्रिय है।",
  },
  {
    chapter: 13,
    verse: 2,
    sa: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते।\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः॥",
    iast: "idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate |\netad yo vetti taṁ prāhuḥ kṣetra-jña iti tad-vidaḥ ||",
    en: "This body, O son of Kunti, is called the field. The one who knows it, those who know call the knower of the field.",
    ta: "குந்தியின் மைந்தா, இந்த உடல் க்ஷேத்திரம் எனப்படும். இதை அறிந்தவனை, அறிந்தோர் க்ஷேத்திரஞன் என்பர்.",
    hi: "हे कौन्तेय, यह शरीर क्षेत्र कहा जाता है। जो इसे जानता है, उसे तत्त्वज्ञ क्षेत्रज्ञ कहते हैं।",
  },
  {
    chapter: 14,
    verse: 5,
    sa: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः।\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम्॥",
    iast: "sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ |\nnibadhnanti mahā-bāho dehe dehinam avyayam ||",
    en: "Sattva, rajas, and tamas — the gunas born of nature — bind the imperishable embodied one in the body, O mighty-armed.",
    ta: "சத்வம், ரஜஸ், தமஸ் — இயற்கையில் பிறந்த குணங்கள் — உடலில் அழியாத உடலுள்ளவனைக் கட்டுகின்றன, பெருந்தோளோனே.",
    hi: "सत्त्व, रज, तम — प्रकृति से उत्पन्न गुण — हे महाबाहो, देह में अव्यय देही को बाँधते हैं।",
  },
  {
    chapter: 15,
    verse: 15,
    sa: "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च।\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम्॥",
    iast: "sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṁ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ||",
    en: "I am seated in the heart of all. From Me come memory, knowledge, and their loss. I am what all the Vedas are to be known as; I am the maker of Vedanta and the knower of the Veda.",
    ta: "எல்லாரின் இதயத்திலும் நான் அமர்ந்துள்ளேன். நினைவு, ஞானம், மறதி என்னிடமிருந்தே. வேதங்கள் அறிய வேண்டியது நானே; வேதாந்தம் செய்பவனும் வேதம் அறிந்தவனும் நானே.",
    hi: "मैं सबके हृदय में स्थित हूँ। मुझसे स्मृति, ज्ञान और अपोहन है। सब वेदों से मैं ही वेद्य हूँ, वेदान्तकृत् और वेदवित् भी मैं हूँ।",
  },
  {
    chapter: 16,
    verse: 1,
    sa: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥",
    iast: "abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam ||",
    en: "Fearlessness, purity of being, steadfastness in the yoga of knowledge, giving, restraint, sacrifice, study, austerity, and honesty —",
    ta: "அச்சமின்மை, உள் தூய்மை, ஞான யோகத்தில் நிலை, ஈகை, அடக்கம், யாகம், ஓதுதல், தவம், நேர்மை —",
    hi: "अभय, सत्त्व की शुद्धि, ज्ञानयोग में स्थिति, दान, दम, यज्ञ, स्वाध्याय, तप, आर्जव —",
  },
  {
    chapter: 17,
    verse: 23,
    sa: "ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः।\nब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा॥",
    iast: "oṁ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ |\nbrāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā ||",
    en: "Om Tat Sat — this is remembered as the threefold designation of Brahman. By it the knowers, the Vedas, and the sacrifices were ordained of old.",
    ta: "ஓம் தத் சத் என்பதே பிரமத்தின் மூவகைக் குறிப்பு. அதனால் அந்தணர், வேதங்கள், யாகங்கள் முற்காலத்தில் அமைக்கப்பட்டன.",
    hi: "ॐ तत् सत् — यह ब्रह्म का त्रिविध निर्देश कहा गया है। उसी से ब्राह्मण, वेद और यज्ञ पुराकाल में विहित हुए।",
  },
  {
    chapter: 18,
    verse: 66,
    sa: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    iast: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
    en: "Leaving all lesser dharmas, come to Me alone for refuge. I will free you from all that binds. Do not grieve.",
    ta: "எல்லாத் தருமங்களையும் விட்டு என்னை ஒருவனையே சரண் அடை. உன்னை எல்லாப் பாவங்களிலிருந்தும் விடுவிப்பேன். வருந்தாதே.",
    hi: "सब धर्मों का परित्याग करके एक मेरी शरण में आओ। मैं तुम्हें सब पापों से मुक्त करूँगा, शोक मत करो।",
    reflection: "The last word is not more effort. It is trust, and the end of fear.",
  },
  {
    chapter: 18,
    verse: 78,
    sa: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
    iast: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ |\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama ||",
    en: "Where Krishna, lord of yoga, is, and where Partha the archer is — there, I believe, are fortune, victory, well-being, and lasting right.",
    ta: "யோகேஸ்வரன் கிருஷ்ணன் இருக்கும் இடம், வில்லேந்திய பார்த்தன் இருக்கும் இடம் — அங்கே திரு, வெற்றி, செல்வம், நிலைத்த நெறி என்பதே என் கருத்து.",
    hi: "जहाँ योगेश्वर कृष्ण हैं, जहाँ धनुर्धर पार्थ हैं — वहाँ श्री, विजय, विभूति और ध्रुव नीति है — यह मेरी मति है।",
  },
];

export const TOTAL_VERSES = CHAPTERS.reduce((n, c) => n + c.verses, 0);

export function chapterByNumber(n: number): Chapter {
  return CHAPTERS.find((c) => c.number === n) ?? CHAPTERS[1];
}

export function versesForChapter(n: number): Verse[] {
  return VERSES.filter((v) => v.chapter === n);
}

export function verseAt(chapter: number, verse: number): Verse | undefined {
  return VERSES.find((v) => v.chapter === chapter && v.verse === verse);
}

export function meaning(verse: Verse, lang: LangId): string {
  const map: Partial<Record<LangId, string | undefined>> = {
    sa: verse.sa,
    en: verse.en,
    ta: verse.ta,
    hi: verse.hi,
    te: verse.te,
    kn: verse.kn,
    ml: verse.ml,
    bn: verse.bn,
    mr: verse.mr,
    gu: verse.gu,
  };
  return map[lang] || verse.en;
}

export function nextVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
  const list = versesForChapter(chapter);
  const i = list.findIndex((v) => v.verse === verse);
  if (i >= 0 && i < list.length - 1) return { chapter, verse: list[i + 1].verse };
  const nextCh = CHAPTERS.find((c) => c.number === chapter + 1);
  if (!nextCh) return null;
  const first = versesForChapter(nextCh.number)[0];
  return first ? { chapter: nextCh.number, verse: first.verse } : null;
}

export function prevVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
  const list = versesForChapter(chapter);
  const i = list.findIndex((v) => v.verse === verse);
  if (i > 0) return { chapter, verse: list[i - 1].verse };
  const prevCh = CHAPTERS.find((c) => c.number === chapter - 1);
  if (!prevCh) return null;
  const prevList = versesForChapter(prevCh.number);
  const last = prevList[prevList.length - 1];
  return last ? { chapter: prevCh.number, verse: last.verse } : null;
}

export const DAILY_KEY = { chapter: 2, verse: 47 } as const;
export const CONTINUE_KEY = { chapter: 2, verse: 14 } as const;

export const SEARCH_CHIPS = ["Dharma", "Karma", "Fear", "Peace", "Detachment"];

export const BOOK_EDITIONS = [
  { id: "original", title: "Original Text", line: "Sanskrit recension", tone: "#8A4A1C" },
  { id: "meaning", title: "With Meaning", line: "Verse and commentary", tone: "#1A3A7A" },
  { id: "daily", title: "For Daily Life", line: "A verse each morning", tone: "#2C4A3A" },
  { id: "path", title: "In 18 Chapters", line: "The complete yoga", tone: "#4A2A48" },
  { id: "audio", title: "Audio Edition", line: "Listen and recite", tone: "#1C2740" },
];
