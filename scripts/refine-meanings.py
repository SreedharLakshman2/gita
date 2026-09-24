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
