#!/usr/bin/env python3
"""Clean English OCR/archaic leftovers and restore traditional sense on key verses."""

from __future__ import annotations

import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
PATH = ROOT / "src" / "verses.json"

CHAPTER1_EN = {
    2: "Sanjaya said: Seeing the Pandava army drawn up in battle array, King Duryodhana approached his teacher Drona and spoke these words.",
    3: "Behold, O teacher, this mighty army of the sons of Pandu, arrayed by your wise disciple, the son of Drupada.",
    4: "Here are heroes, mighty archers, equal in battle to Bhima and Arjuna — Yuyudhana, Virata, and Drupada, the great chariot-warrior.",
    5: "Dhrishtaketu, Chekitana, the valiant king of Kashi, Purujit, Kuntibhoja, and Shaibya, foremost among men.",
    6: "The strong Yudhamanyu, the brave Uttamaujas, the son of Subhadra, and the sons of Draupadi — all great chariot-warriors.",
    7: "Know also, O best of the twice-born, the distinguished ones among us, the leaders of my army. These I name to you.",
    8: "Yourself, Bhishma, Karna, and Kripa, victorious in war; Ashvatthama, Vikarna, and the son of Somadatta as well.",
    9: "And many other heroes, ready to lay down their lives for my sake, armed with many weapons, all skilled in battle.",
    10: "Our army, guarded by Bhishma, is not sufficient; their army, guarded by Bhima, is sufficient.",
    11: "Therefore, stationed in your respective positions in every division, all of you protect Bhishma alone.",
    12: "The valiant grandsire of the Kurus, the eldest of them, roaring like a lion to cheer Duryodhana, blew his conch.",
    13: "Then conches, kettledrums, tabors, drums, and horns blared forth all at once, and the sound was tremendous.",
    14: "Then Madhava and the son of Pandu, seated in the great chariot yoked with white horses, blew their divine conches.",
    15: "Hrishikesha blew Panchajanya, Dhananjaya blew Devadatta, and Bhima, doer of terrible deeds, blew the great conch Paundra.",
    16: "King Yudhishthira, son of Kunti, blew Anantavijaya; Nakula and Sahadeva blew Sughosha and Manipushpaka.",
    17: "The king of Kashi, an excellent archer, Shikhandi the great chariot-warrior, Dhrishtadyumna, Virata, and unconquered Satyaki blew their conches.",
    18: "Drupada, the sons of Draupadi, O lord of the earth, and the mighty-armed son of Subhadra blew their conches separately.",
    19: "That terrible sound shook heaven and earth, and rent the hearts of Dhritarashtra’s sons.",
    20: "Then, O lord of the earth, seeing Dhritarashtra’s men arrayed and the weapons about to fly, Arjuna, whose banner is a monkey, took up his bow and spoke to Krishna.",
    22: "Place my chariot between the two armies, O Krishna, so that I may see those standing here eager to fight, and know with whom I must fight in this battle.",
    23: "I wish to see those who have gathered here to fight, wishing to please the evil-minded son of Dhritarashtra.",
    24: "Sanjaya said: Addressed thus by Arjuna, O Dhritarashtra, Hrishikesha placed that best of chariots in the midst of the two armies.",
    25: "In front of Bhishma, Drona, and all the rulers of the earth, he said: O Partha, behold these Kurus gathered together.",
    26: "There Arjuna saw fathers and grandfathers, teachers, maternal uncles, brothers, sons, grandsons, and friends standing in the armies.",
    27: "He saw fathers-in-law and companions also in both armies. Seeing all those kinsmen standing arrayed, the son of Kunti was filled with deep pity and spoke in sorrow.",
    29: "My limbs fail, my mouth is parched, my body trembles, and my hair stands on end.",
    30: "Gandiva slips from my hand, and my skin burns all over. I cannot even stand; my mind seems to reel.",
    31: "I see adverse omens, O Keshava. I see no good in killing my own kinsmen in battle.",
    32: "I desire neither victory, O Krishna, nor kingdom, nor pleasures. Of what use is kingdom to us, or enjoyments, or even life?",
    33: "Those for whose sake we desire kingdom, enjoyments, and pleasures stand here in battle, having given up life and wealth.",
    34: "Teachers, fathers, sons, grandfathers, maternal uncles, fathers-in-law, grandsons, brothers-in-law, and other kinsmen —",
    35: "these I do not wish to kill, though they kill me, O Madhusudana, even for the sovereignty of the three worlds — how much less for the earth?",
    36: "What joy can be ours, O Janardana, by killing these sons of Dhritarashtra? Only sin will come upon us if we slay these men, even if they are aggressors.",
    37: "Therefore we should not kill the sons of Dhritarashtra, our own kinsmen. How can we be happy by killing our own people, O Madhava?",
    38: "Even if they, with minds overpowered by greed, see no evil in destroying the family and no sin in hostility to friends,",
    39: "why should we, who clearly see the evil in the destruction of a family, not turn away from this sin, O Janardana?",
    40: "In the destruction of a family, the ancient family dharmas perish. When dharma is destroyed, adharma overpowers the whole family.",
    41: "When adharma prevails, O Krishna, the women of the family are corrupted; when women are corrupted, O Varshneya, there arises confusion of varnas.",
    42: "This confusion of varnas leads the slayers of the family to hell, for their ancestors fall, deprived of the offerings of rice-ball and water.",
    43: "By these misdeeds of those who destroy the family, causing confusion of varnas, the everlasting dharmas of caste and family are destroyed.",
    44: "We have heard, O Janardana, that hell is the dwelling, for an unknown time, of those whose family dharmas have been destroyed.",
    45: "Alas, we are resolved to commit a great sin, ready to kill our own kinsmen out of greed for the pleasures of kingdom.",
    46: "If the sons of Dhritarashtra, weapons in hand, should slay me in battle, unresisting and unarmed, that would be better for me.",
}

# Traditional sense for verses people know from the book.
EN_FIX = {
    (2, 6): "I can hardly tell which is better — that we should conquer them or that they should conquer us. Even the sons of Dhritarashtra, after slaying whom we would not wish to live, stand facing us.",
    (2, 16): "The unreal has no being; the real never ceases to be. The seers of truth have seen the end of both.",
    (2, 31): "Further, looking to your own duty, you should not waver, for there is nothing higher for a Kshatriya than a righteous war.",
    (2, 47): "Your right is to action alone, never to its fruits. Let not the fruits of action be your motive, and do not cling to inaction.",
    (3, 2): "With this apparently perplexing speech You confuse my understanding. Therefore tell me that one path by which I may attain the good.",
    (3, 10): "The Creator, having in the beginning created mankind together with sacrifice, said: By this you shall propagate; let this be the milch cow of your desires.",
    (3, 11): "With this nourish the gods, and may those gods nourish you; thus nourishing one another, you shall attain the highest good.",
    (3, 20): "Janaka and others attained perfection by action alone; even with a view to the protection of the world, you should perform action.",
    (3, 43): "Thus knowing Him who is superior to the intellect, and restraining the self by the Self, slay the enemy in the form of desire, O mighty-armed Arjuna — hard to conquer.",
    (4, 4): "Arjuna said: Later was Your birth, and prior to it was the birth of Vivasvan. How am I to understand that You taught this Yoga in the beginning?",
    (5, 19): "Even here, birth is overcome by those whose minds rest in equality. Brahman is spotless and equal; therefore they are established in Brahman.",
    (6, 32): "He who, through the likeness of the Self, O Arjuna, sees equality everywhere, in pleasure or in pain, is regarded as the highest Yogi.",
    (4, 7): "Whenever dharma declines, O Bharata, and adharma rises, then I manifest Myself.",
    (4, 8): "For the protection of the good, for the destruction of the wicked, and for the establishment of dharma, I am born age after age.",
    (4, 33): "Better than the sacrifice of material objects is the sacrifice of knowledge, O scorcher of foes. All action in its entirety, O Partha, culminates in knowledge.",
    (2, 42): "Flowery speech is uttered by the unwise, who delight in the letter of the Vedas, O Partha, saying there is nothing else.",
    (2, 65): "In that peace all pains are destroyed, for the intellect of the tranquil-minded soon becomes steady.",
    (4, 34): "Know that by humble reverence, by question, and by service. The wise who have realised the Truth will instruct you in that knowledge.",
    (5, 8): "The harmonised knower of Truth should think, I do nothing at all — though seeing, hearing, touching, smelling, eating, going, sleeping, breathing.",
    (5, 27): "Shutting out external contacts, fixing the gaze between the eyebrows, and equalising the outgoing and incoming breaths moving within the nostrils.",
    (6, 3): "For a sage who wishes to attain to Yoga, action is said to be the means; for the same sage who has attained to Yoga, stillness is said to be the means.",
    (8, 10): "At the time of death, with unshaken mind, endowed with devotion, by the power of Yoga, fixing the whole life-breath between the eyebrows, he reaches that resplendent Supreme Person.",
    (12, 6): "But those who worship Me, renouncing all actions in Me, regarding Me as the supreme goal, meditating on Me with single-minded Yoga.",
    (6, 5): "One should lift oneself by oneself, and not degrade oneself. The self alone is the friend of the self, and the self alone is the enemy of the self.",
    (6, 38): "Fallen from both, without support, O mighty-armed, and deluded on the path of Brahman — does he not perish like a riven cloud?",
    (9, 22): "Those who worship Me, thinking of nothing else — to those ever devoted, I carry what they lack and protect what they have.",
    (9, 26): "A leaf, a flower, a fruit, or water — whoever offers it to Me with devotion, that offering of a pure heart I accept.",
    (18, 45): "Devoted to his own duty, a man attains perfection. Hear now how one devoted to his own duty finds that perfection.",
    (9, 27): "Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give, whatever austerity you practice, O son of Kunti, do that as an offering to Me.",
    (9, 34): "Fix your mind on Me, be devoted to Me, worship Me, and bow to Me. Thus uniting yourself with Me as your supreme goal, you shall come to Me.",
    (8, 1): "Arjuna said: What is that Brahman? What is Adhyatma? What is Karma, O Purushottama? What is said to be Adhibhuta, and what is called Adhidaiva?",
    (10, 15): "You Yourself know Yourself by Yourself, O Purushottama, source of beings, Lord of beings, God of gods, Lord of the world.",
    (10, 16): "You should indeed tell, without reserve, of Your divine glories by which You exist, pervading all these worlds.",
    (11, 30): "You lick up all the worlds on every side, devouring them with Your flaming mouths. Your fierce rays fill the whole world with radiance and are burning, O Vishnu.",
    (11, 32): "I am Time, the mighty destroyer of worlds, engaged here in destroying the worlds. Even without you, none of the warriors in the opposing armies will remain.",
    (11, 33): "Therefore stand up and obtain fame. Conquer the enemies and enjoy the unrivalled kingdom. They have already been slain by Me; be merely an instrument, O Arjuna.",
    (11, 34): "Drona, Bhishma, Jayadratha, Karna, and other brave warriors — these have already been slain by Me. Strike them; do not be distressed with fear. Fight, and you shall conquer your enemies in battle.",
    (11, 40): "Salutations to You in front and behind! Salutations to You on every side! O All, infinite in power and prowess, You pervade all; therefore You are all.",
    (11, 44): "Therefore, bowing down, prostrating my body, I crave Your forgiveness, O adorable Lord. As a father forgives his son, a friend his friend, a lover his beloved, even so should You forgive me, O God.",
    (12, 19): "He to whom censure and praise are equal, who is silent, content with anything, homeless, of a steady mind, and full of devotion — that man is dear to Me.",
    (12, 3): "But those who worship the Imperishable, the Indefinable, the Unmanifest, the Omnipresent, the Unthinkable, the Unchanging, the Immovable, the Eternal —",
    (12, 18): "The same to foe and friend, and in honour and dishonour; the same in cold and heat, pleasure and pain; free from attachment —",
    (13, 3): "Know Me also as the knower of the field in all fields, O Arjuna. Knowledge of both the field and the knower of the field is considered by Me to be true knowledge.",
    (16, 24): "Therefore let the scripture be your authority in determining what ought to be done and what ought not to be done. Having known what is said in the ordinance of the scriptures, you should act here in this world.",
    (18, 62): "Seek refuge in Him with all your being, O Bharata. By His grace you shall obtain supreme peace and the eternal abode.",
    (18, 63): "Thus has wisdom, more secret than secrecy itself, been declared to you by Me. Reflect on it fully, then act as you choose.",
    (18, 65): "Fix your mind on Me, be devoted to Me, worship Me, and bow to Me. You shall come to Me. I truly promise this, for you are dear to Me.",
    (18, 66): "Abandoning all dharmas, take refuge in Me alone. I will free you from all sins. Do not grieve.",
}

HI_FIX = {
    (2, 20): "यह कभी जन्म नहीं लेता, मरता नहीं। यह होकर फिर अभाव को प्राप्त नहीं होता। अजन्मा, नित्य, शाश्वत, पुराण — शरीर के मारे जाने पर यह नहीं मारा जाता।",
    (18, 33): "हे पार्थ! योग के द्वारा मन, प्राण और इन्द्रियों की क्रियाओं को अव्यभिचारिणी धृति से धारण किया जाता है, वह धृति सात्त्विकी है।",
}

TA_FIX = {
    (2, 6): "நாம் வெல்வதோ அவர்கள் நம்மை வெல்வதோ — இவற்றுள் எது மேல் என்று அறியோம். கொன்றால் வாழ விரும்பாத அந்தத் திருதராஷ்டிர மக்களே நம்முன் நிற்கின்றனர்.",
    (2, 16): "இல்லாததற்கு இருத்தல் இல்லை; உள்ளதற்கு அழிவு இல்லை. இவ்விரண்டின் எல்லையையும் உண்மை அறிந்தோர் கண்டனர்.",
    (2, 47): "உனக்கு உரிமை செயலில் மட்டுமே — ஒருபோதும் அதன் பயனில் அல்ல. செயலின் பயனை நோக்கமாகக் கொள்ளாதே; செய்யாதிருப்பதிலும் பற்று வேண்டாம்.",
    (4, 31): "யாக எச்சமாகிய அமுதம் உண்போர் சனாதன பிரம்மத்தை அடைவர். யாகம் இல்லாதவனுக்கு இவ்வுலகமே இல்லை, குருசிறந்தவனே; மற்ற உலகம் எங்கே?",
    (18, 33): "யோகத்தால் மனம், உயிர், பொறிகளின் செயல்களைத் தளராது தாங்குவது சாத்விக உறுதி, பார்த்தா.",
    (18, 34): "தருமம், விருப்பம், பொருள் ஆகியவற்றைப் பயன் ஆசையுடனும் பற்றுடனும் தாங்குவது ராஜச உறுதி, அர்ஜுனா.",
    (4, 7): "தருமம் தளரும் போதெல்லாம், பாரதா, அதர்மம் எழும் போதெல்லாம், அப்போது நான் என்னை வெளிப்படுத்துகிறேன்.",
    (4, 8): "நல்லோரைக் காக்கவும், தீயோரை அழிக்கவும், தருமத்தை நிலைநிறுத்தவும், யுகம் தோறும் நான் தோன்றுகிறேன்.",
    (6, 5): "தன்னால் தன்னை உயர்த்திக்கொள்; தன்னைத் தாழ்த்தாதே. தானே தனக்கு நண்பன்; தானே தனக்குப் பகைவன்.",
    (9, 22): "வேறொன்றும் நினையாது என்னையே வழிபடுவோருக்கு — எப்போதும் என்னில் இணைந்தவர்களுக்கு — இல்லாததை அளித்து உள்ளதைக் காக்கும் யோகக்ஷேமத்தை நான் ஏற்று நடத்துகிறேன்.",
    (9, 26): "இலை, பூ, கனி, நீர் — பக்தியுடன் எனக்கு அளிப்பவனின் அந்தத் தூய உள்ளக் காணிக்கையை நான் ஏற்றுக்கொள்கிறேன்.",
    (9, 34): "மனத்தை என்னில் வை; என் பக்தனாக இரு; எனக்கு வழிபாடு செய்; என்னை வணங்கு. இவ்வாறு என்னையே உயர் இலக்காகக் கொண்டு என்னையே அடைவாய்.",
    (18, 65): "மனத்தை என்னில் வை; என் பக்தனாக இரு; எனக்கு வழிபாடு செய்; என்னை வணங்கு. என்னை அடைவாய். இது உண்மை; நீ எனக்கு அன்புள்ளவன்.",
    (18, 66): "எல்லாத் தருமங்களையும் விட்டு என்னை ஒருவனையே சரண் அடை. உன்னை எல்லாப் பாவங்களிலிருந்தும் விடுவிப்பேன். வருந்தாதே.",
    (2, 37): "கொல்லப்பட்டால் சுவர்க்கத்தை அடைவாய்; வென்றால் பூமியை நுகர்வாய். எனவே போரிட உறுதிகொண்டு எழுந்து நில், கௌந்தேயா.",
    (2, 42): "பார்த்தா, வேதவாதத்தில் மகிழும் அறிவிலிகள், மலர்ந்த அழகிய சொற்களைப் பேசி, இதைவிட வேறொன்று இல்லை என்று வாதிடுகின்றனர்.",
    (2, 62): "பொருள்களை நினைப்பவனிடம் அவற்றில் பற்று பிறக்கும்; பற்றிலிருந்து ஆசை பிறக்கும்; ஆசையிலிருந்து கோபம் பிறக்கும்.",
    (2, 65): "அந்த அமைதியில் எல்லாத் துன்பங்களும் அகலும்; தூய மனத்தினுடைய அறிவு விரைவில் உறுதிபெறும்.",
    (3, 4): "செயல்களைத் தொடங்காமலே ஆள்வற்ற நிலையை அடைய முடியாது; வெறும் துறவினாலேயே சித்தியையும் அடைய முடியாது.",
    (3, 36): "அர்ஜுனன் கேட்டான் — வர்ஷ்நேயா, ஒருவன் விரும்பாமலே வலிந்திழுக்கப்படுவதுபோல் பாவத்தில் தள்ளப்படுவது எதனால்?",
    (4, 2): "இவ்வாறு வழிவழியாக வந்த இந்த யோகத்தை அரசமுனிவர்கள் அறிந்தனர். பகை வெல்லுமவனே, நீண்ட காலத்தால் அது இங்கே அழிந்தது.",
    (4, 10): "பற்றும் அச்சமும் கோபமும் நீங்கி, என்னில் அடைக்கலம் புகுந்து, அறிவால் தூய்மை அடைந்த பலர் என் தன்மையை அடைந்தனர்.",
    (4, 39): "நம்பிக்கை உள்ளவன், அதில் ஈடுபட்டவன், பொறிகளை அடக்கியவன் இந்த அறிவை அடைவான்; அறிவை அடைந்தவன் உயர் அமைதியை விரைவில் அடைவான்.",
    (5, 8): "உண்மை அறிந்த இணைந்தவன், பார்த்தாலும் கேட்டாலும் தொட்டாலும் முகர்ந்தாலும் உண்டாலும் நடந்தாலும் உறங்கினாலும் மூச்சு விட்டாலும், நான் சிறிதும் செய்யவில்லை என அறிவான்.",
    (5, 27): "வெளிப் பொருள்களை வெளியே விட்டு, பார்வையை இரு புருவங்களின் நடுவில் நிறுத்தி, மூக்கில் செல்லும் உள்மூச்சையும் வெளிமூச்சையும் சமப்படுத்துவான்.",
    (6, 3): "யோகத்தில் ஏற விரும்பும் முனிவனுக்குச் செயலே வழி எனச் சொல்லப்படுகிறது; ஏறிவிட்ட அதேவனுக்கு அமைதியே வழி எனச் சொல்லப்படுகிறது.",
    (6, 42): "அல்லது ஞானம் பெற்ற யோகிகளின் குலத்திலேயே பிறப்பான்; இப்படிப்பட்ட பிறப்பு இவ்வுலகில் மிக அரிது.",
    (10, 4): "அறிவு, ஞானம், மயக்கமின்மை, பொறுமை, உண்மை, பொறி அடக்கம், மன அமைதி, இன்பம், துன்பம், பிறப்பு, இறப்பு, அச்சம், அச்சமின்மை ஆகிய இவை என்னிடமிருந்து தோன்றுவன.",
    (11, 10): "பல வாய்களும் கண்களும், பல அதிசய காட்சிகளும், பல தெய்வ அணிகலன்களும், கைகளில் உயர்த்திய பல தெய்வ ஆயுதங்களும் கொண்ட அந்த உருவத்தை அவர் காட்டினார்.",
    (11, 26): "திருதராஷ்டிரனின் மக்களெல்லாம் அரசர் கூட்டத்துடன் உம்மிலே நுழைகின்றனர்; பீஷ்மன், துரோணன், கர்ணனும் எங்கள் தலைமை வீரரும் அவ்வாறே.",
    (11, 41): "நண்பன் என்று எண்ணி உம் பெருமையை அறியாது, மறதியாலோ அன்பாலோ ‘கிருஷ்ணா, யாதவா, தோழா’ என்று நான் சொன்னதெல்லாம் பொறுத்தருள வேண்டும்.",
    (12, 3): "ஆயினும் அழிவற்றதும் சுட்டிக்காட்ட இயலாததும் வெளிப்படாததும் எங்கும் நிறைந்ததும் சிந்திக்க இயலாததும் கூடஸ்தமும் அசையாததும் நிலையானதுமான அக்ஷரத்தை வழிபடுவோரும் உண்டு.",
    (12, 6): "ஆயினும் என்னையே உயர் இலக்காகக் கொண்டு எல்லாச் செயல்களையும் எனக்கு அர்ப்பணித்து, வேறொன்றும் இல்லாத யோகத்தால் என்னையே தியானித்து வழிபடுவோர் உண்டு.",
    (12, 13): "எவ்வுயிரிடமும் வெறுப்பின்றி, நட்பும் கருணையும் உடையவன், எனது என்னும் செருக்கின்றி, துன்பத்திலும் இன்பத்திலும் சமன், பொறுமையுள்ளவன் எனக்கு இனியன்.",
    (12, 18): "பகையிலும் நட்பிலும், மானத்திலும் அவமானத்திலும் சமன்; குளிர் வெப்பம் இன்ப துன்பம் ஆகிய இரட்டைகளில் சமன்; பற்றற்றவன் எனக்கு இனியன்.",
    (13, 6): "பெரும் பூதங்கள், அகங்காரம், அறிவு, வெளிப்படாத இயற்கை, பத்துப் பொறிகள், ஒன்றாகிய மனம், ஐந்து பொறிப் பொருள்கள் ஆகிய இவை க்ஷேத்திரம்.",
    (13, 8): "அகந்தை இன்மை, பகட்டு இன்மை, அகிம்சை, பொறுமை, நேர்மை, ஆசிரியர் தொண்டு, தூய்மை, உறுதி, ஆன்ம அடக்கம் ஆகிய இவை ஞானம்.",
    (13, 9): "பொறிப் பொருள்களில் விரக்தி, அகங்காரம் இன்மை, பிறப்பு இறப்பு மூப்பு நோய் துன்பத்தில் குற்றத்தைக் காணல் ஆகிய இவையும் ஞானம்.",
    (13, 10): "பற்று இன்மை, மக்கள் மனைவி இல்லம் ஆகியவற்றில் ஒன்றாதல் இன்மை, இனியதிலும் இன்னாதிலும் எப்போதும் சமபுத்தி ஆகிய இவையும் ஞானம்.",
    (13, 11): "என்னில் வேறொன்றும் இல்லாத யோக பக்தி, தனி இடங்களில் இருத்தல், மக்கள் கூட்டத்தில் விருப்பம் இன்மை ஆகிய இவையும் ஞானம்.",
    (13, 19): "க்ஷேத்திரம், அறிவு, அறிய வேண்டியது இவ்வாறு சுருக்கமாகச் சொல்லப்பட்டது. என் பக்தன் இதை உண்மையில் அறிந்து என் தன்மையை அடைவான்.",
    (14, 11): "இந்த உடலின் எல்லா வாயில்களிலும் அறிவு ஒளி பிறக்கும்போது சத்வம் மேலோங்கியது என அறிக.",
    (14, 14): "சத்வம் மேலோங்கிய நேரத்தில் உடலை விட்டால், உயர்ந்ததை அறிந்தோரின் தூய உலகங்களை அடைவான்.",
    (14, 19): "குணங்களைத் தவிர வேறு செயலாளன் இல்லை எனக் காண்பவனும், குணங்களுக்கு மேல் நிற்பவனும் என் தன்மையை அடைவான்.",
    (14, 22): "பாண்டவா, ஒளி, தொழில், மயக்கம் ஆகியவை வந்தாலும் வெறுக்காதவன், அவை போனாலும் விரும்பாதவன் அறிந்தவன்.",
    (14, 23): "ஒதுங்கி அமர்ந்தவன் போல் குணங்களால் அசைக்கப்படாதவன், குணங்களே நடப்பதாக அறிந்து நிலைபெற்று அசையாதவன்.",
    (14, 24): "இன்பத்திலும் துன்பத்திலும் சமன், ஆன்மாவில் நிலைத்தவன், மண் கல் பொன் ஒன்றே என்பவன், இனியதும் இன்னாதும் புகழும் இகழ்ச்சியும் ஒன்றே எனும் தீரன்.",
    (15, 3): "இதன் உருவம் இங்கே அப்படியே காணப்படுவதில்லை; முடிவும் தொடக்கமும் நிலையும் இல்லை. இந்த ஆழ வேர் கொண்ட அரச மரத்தை உறுதியான பற்று இன்மை என்னும் ஆயுதத்தால் வெட்டுக.",
    (16, 1): "அச்சமின்மை, உள்ளத் தூய்மை, ஞான யோகத்தில் நிலை, ஈகை, அடக்கம், யாகம், ஓதுதல், தவம், நேர்மை ஆகிய இவை தெய்வ சம்பத்து.",
    (16, 2): "அகிம்சை, உண்மை, கோபம் இன்மை, துறவு, அமைதி, புறங்கூறாமை, உயிர்களிடம் இரக்கம், ஆசை இன்மை, மென்மை, நாணம், அலையாமை ஆகிய இவையும் தெய்வ குணங்கள்.",
    (16, 11): "மரணம் வரை முடியாத அளவற்ற கவலையை அடைந்தவர்கள், இன்ப நுகர்ச்சியே உயர் இலக்கு என்று இவ்வளவே என உறுதி கொண்டவர்கள்.",
    (17, 2): "உடலுள்ளோரின் இயல்பான நம்பிக்கை மூன்று வகை — சாத்விகம், ராஜசம், தாமசம். அதை என்னிடமிருந்து கேள்.",
    (17, 5): "சாஸ்திர விதி இல்லாமல் கொடிய தவங்களைச் செய்பவர்கள், பகட்டும் அகங்காரமும் ஆசையும் பற்றும் வலிமையும் கொண்டவர்கள்.",
    (17, 11): "பயனை எண்ணாமல், இது கடமை என்று மனம் நிலைபெறச் சாஸ்திரப்படி செய்யப்படும் யாகம் சாத்விகம்.",
    (17, 12): "பயனை நோக்கியும் பகட்டுக்காகவும் செய்யப்படும் யாகத்தை, பாரத சிறந்தவனே, ராஜசம் என அறிக.",
    (17, 16): "மன மகிழ்ச்சி, சாந்தம், மௌனம், ஆன்ம அடக்கம், அகமனத் தூய்மை ஆகிய இது மனத் தவம் எனச் சொல்லப்படுகிறது.",
    (17, 25): "தத் என்று சொல்லி, பயனை விரும்பாமல், வீடுபேறு வேண்டுவோர் யாகம் தவம் தானம் ஆகிய பல செயல்களைச் செய்கின்றனர்.",
    (18, 14): "அதிஷ்டானம் என்னும் உடல், செயலாளன், பலவகைக் கரணங்கள், பலவகைச் செயல்கள், ஐந்தாவதாகத் தெய்வம் ஆகிய இவை ஐந்து காரணங்கள்.",
    (18, 21): "எல்லா உயிர்களிலும் பலவகைத் தன்மைகளைத் தனித்தனியாகக் காணும் அறிவு ராஜசம் என அறிக.",
    (18, 36): "இப்போது மூன்று வகை இன்பத்தை என்னிடமிருந்து கேள், பாரத சிறந்தவனே. பயிற்சியால் அதில் மகிழ்ந்து துன்பத்தின் முடிவை அடைவது இன்பம்.",
    (18, 40): "பூமியிலோ விண்ணில் தேவர்களிலோ, இயற்கையிலிருந்து பிறந்த இந்த மூன்று குணங்களிலிருந்து விடுபட்ட உயிர் இல்லை.",
    (18, 51): "தூய அறிவால் இணைந்து, உறுதியால் ஆன்மாவை அடக்கி, சப்தம் முதலிய பொருள்களை விட்டு, ஆசையும் வெறுப்பும் நீக்குவான்.",
    (18, 52): "தனி இடத்தில் இருந்து, சிறிதே உண்டு, வாக்கு உடல் மனம் அடங்கி, தியான யோகத்தில் எப்போதும் இருந்து, வைராக்யத்தை அடைந்தவன்.",
    (18, 60): "சுபாவத்திலிருந்து பிறந்த உன் கர்மத்தால் கட்டப்பட்ட நீ, கௌந்தேயா, மயக்கத்தால் செய்ய விரும்பாததையே வலியச் செய்வாய்.",
    (18, 62): "முழு உள்ளத்துடன் அவனிடமே சரண் அடைக, பாரதா. அவன் அருளால் உயர் அமைதியையும் நிலைத்த இருப்பிடத்தையும் அடைவாய்.",
    (18, 69): "மனிதரில் அவனைவிட எனக்குப் பிரியமான தொண்டு செய்பவன் இல்லை; பூமியில் அவனைவிட எனக்குப் பிரியமானவன் இனி இருக்கவும் மாட்டான்.",
}

ARCHAIC = [
    (r"\byou doest\b", "you do"),
    (r"\byou eatest\b", "you eat"),
    (r"\byou offerest\b", "you offer"),
    (r"\byou givest\b", "you give"),
    (r"\byou practisest\b", "you practice"),
    (r"\byou knowest\b", "you know"),
    (r"\byou seest\b", "you see"),
    (r"\byou goest\b", "you go"),
    (r"\byou comest\b", "you come"),
    (r"\byou wishest\b", "you wish"),
    (r"\byou hast\b", "you have"),
    (r"\byou hath\b", "you have"),
    (r"\bThe unreal hath\b", "The unreal has"),
    (r"\bhath no\b", "has no"),
    (r"\bhath\b", "has"),
    (r"\bNeither doth\b", "Neither does"),
    (r"\bdoth\b", "does"),
    (r"\bwho who art\b", "who are"),
    (r"\bwho art beloved\b", "who are beloved"),
    (r"\bart You\b", "are You"),
    (r"\bart you\b", "are you"),
    (r"\bWho art\b", "Who are"),
    (r"\bwhich you hast\b", "which you have"),
    (r"\bYou hast\b", "You have"),
    (r"\byou hast\b", "you have"),
    (r"\bThyself\b", "Yourself"),
    (r"\bthyself\b", "yourself"),
    (r"\bThine\b", "Your"),
    (r"\bthine\b", "your"),
    (r"\bunto Me\b", "to Me"),
    (r"\bunto you\b", "to you"),
    (r"\bunto Him\b", "to Him"),
    (r"\bunto Thee\b", "to You"),
    (r"\bunto You\b", "to You"),
    (r"\bcome unto\b", "come to"),
    (r"\bFly unto\b", "Fly to"),
    (r"\bdeclared unto\b", "declared to"),
    (r"\bsacrifice unto\b", "sacrifice to"),
    (r"\bdevotion unto\b", "devotion to"),
    (r"\bsalutations unto\b", "salutations to"),
    (r"\bby devoted to Me\b", "be devoted to Me"),
    (r"\bdo ye all\b", "do you all"),
    (r"\blesser dharmas\b", "dharmas"),
    (r"\bthinkest\b", "think"),
    (r"\bpraisest\b", "praise"),
    (r"\bdost You\b", "do You"),
    (r"\bdost you\b", "do you"),
    (r"\bconeror\b", "conqueror"),
    (r"\beanimity\b", "equanimity"),
    (r"\bthree alities\b", "three qualities"),
    (r"\balities\b", "qualities"),
    (r"\bality of\b", "quality of"),
    (r"\bthe ality\b", "the quality"),
    (r"\ball arters\b", "all quarters"),
    (r"\bas well as of your\b", "as well as yours"),
    (r"\bcar-warriors\b", "chariot-warriors"),
    (r"\bcar-warrior\b", "chariot-warrior"),
    (r"\bite pure\b", "quite pure"),
    (r"\bite peaceful\b", "quite peaceful"),
    (r"\bieted\b", "quieted"),
    (r"\bin the seel\b", "in the sequel"),
    (r"\brelinishing\b", "relinquishing"),
    (r"\bconered\b", "conquered"),
    (r"\bwho does not cavil\b", "who does not find fault"),
    (r"\bshouldst\b", "should"),
    (r"\bconfusest\b", "confuse"),
    (r"\btaughtest\b", "taught"),
    (r"\bsayest\b", "say"),
    (r"\bexistest\b", "exist"),
    (r"\blickest\b", "lick"),
    (r"\bpervadest\b", "pervade"),
    (r"\bdesirest\b", "desire"),
    (r"\bshall ye\b", "you shall"),
    (r"\bdo ye\b", "do you"),
    (r"\bye shall\b", "you shall"),
    (r"\bye\b", "you"),
    (r"\bConer\b", "Conquer"),
    (r"\bconer\b", "conquer"),
    (r"\beality\b", "equality"),
    (r"\beal\b", "equal"),
    (r"\bknow you that\b", "know that"),
    (r"\bbe you above\b", "be above"),
    (r"\bbe you intent\b", "be intent"),
    (r"\beyrows\b", "eyebrows"),
    (r"\beyrow\b", "eyebrow"),
    (r"\bealising\b", "equalising"),
    (r"\btranil-minded\b", "tranquil-minded"),
    (r"\bsupreme gaol\b", "supreme goal"),
    (r"\(iescence\)", "(quiescence)"),
    (r"\bby estion\b", "by question"),
    (r"\bYogies\b", "Yogis"),
    (r"\bkingl science\b", "kingly science"),
    (r"\bdevotio,", "devotion,"),
]


def clean_en(text: str, chapter: int, verse: int) -> str:
    s = text.replace("\xa0", " ")
    s = s.replace("ï1", "")
    s = s.replace(" / ", " ")
    s = re.sub(rf"^{chapter}\.{verse}\.?\s+", "", s.strip())
    s = re.sub(r"^[\"“]+", "", s)
    s = re.sub(r"\s+", " ", s)
    s = s.replace(" ,", ",")
    s = s.replace(" -", " —")
    for pat, rep in ARCHAIC:
        s = re.sub(pat, rep, s)
    s = s.replace("O krishna", "O Krishna")
    s = s.replace("unconered", "unconquered")
    s = s.replace("exellent", "excellent")
    s = s.replace("eal in battle", "equal in battle")
    s = s.replace("an eal eye", "an equal eye")
    s = s.replace("who is eal to You", "who is equal to You")
    s = s.replace("eal to You", "equal to You")
    s = s.replace("marshelled", "marshalled")
    s = s.replace("ite suddenly", "suddenly")
    s = s.replace("body ivers", "body shivers")
    s = s.replace("skins burns", "skin burns")
    s = s.replace("Yoyudhana", "Yuyudhana")
    s = s.replace("Yodhishthira", "Yudhishthira")
    s = s.replace("Yodhamanyu", "Yudhamanyu")
    s = s.replace("who who are", "who are")
    s = s.replace("an eal eye", "an equal eye")
    s = s.replace("who is eal to You", "who is equal to You")
    s = s.replace("eal to You", "equal to You")
    s = s.replace("O All!!", "O All!")
    s = s.replace(", should not waver", ", you should not waver")
    s = re.sub(r"^(The Blessed Lord said) (?!:)", r"\1: ", s)
    s = re.sub(r"^(Arjuna said) (?!:)", r"\1: ", s)
    s = re.sub(r"^(Sanjaya said) (?!:)", r"\1: ", s)
    s = re.sub(r"\s+", " ", s).strip(" \"")
    if s and not s.endswith((".", "?", "!", "—", ";")):
        s += "."
    return s


def clean_hi(text: str) -> str:
    s = text.replace("सार्मथ्य", "सामर्थ्य")
    s = re.sub(r"^हो पार्थ", "हे पार्थ", s)
    return s.strip()


def main() -> None:
    verses = json.loads(PATH.read_text())
    changed = 0
    for v in verses:
        ch, vs = v["chapter"], v["verse"]
        original = (v["en"], v["ta"], v["hi"])
        if ch == 1 and vs in CHAPTER1_EN:
            v["en"] = CHAPTER1_EN[vs]
        elif (ch, vs) in EN_FIX:
            v["en"] = EN_FIX[(ch, vs)]
        v["en"] = clean_en(v["en"], ch, vs)
        if (ch, vs) in TA_FIX:
            v["ta"] = TA_FIX[(ch, vs)]
        if (ch, vs) in HI_FIX:
            v["hi"] = HI_FIX[(ch, vs)]
        v["hi"] = clean_hi(v["hi"])
        if (v["en"], v["ta"], v["hi"]) != original:
            changed += 1
    PATH.write_text(json.dumps(verses, ensure_ascii=False, separators=(",", ":")) + "\n")
    print(f"updated {changed} verses -> {PATH}")


if __name__ == "__main__":
    main()
