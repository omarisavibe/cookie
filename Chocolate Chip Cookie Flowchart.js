document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const body = document.body;
    const langButtons = document.querySelectorAll('.lang-btn');
    const typeSelectorButtons = document.querySelectorAll('.selector-btn');
    const recipeDetailsContainer = document.getElementById('recipe-details');
    const keyDifferencesContainer = document.getElementById('key-differences');
    const selectedCookieNameSpan = document.getElementById('selected-cookie-name');
    const butterMethodDesc = document.getElementById('butter-method-desc');
    const chillingMethodDesc = document.getElementById('chilling-method-desc');
    const otherNotesDesc = document.getElementById('other-notes-desc');
    const tipsListContainer = document.getElementById('tips-list');

    // --- State Variables ---
    let currentLanguage = 'en';
    let currentCookieType = null;

    // --- Content Data Store (English & Arabic) ---
    const contentData = {
        en: {
            // UI Text
            mainTitle: "🍪 Interactive Choc Chip Cookie Guide 🍪",
            yieldInfo: "Yields: Approx. 18-24 cookies",
            chooseStyle: "Choose Your Cookie Style:",
            typeClassic: "Classic Balanced",
            typeThick: "Thick & Gooey",
            typeThin: "Thin & Crispy",
            keyDifferencesTitle: "🔑 Key Differences for", // Name appended dynamically
            butterTitle: "Butter State & Mixing",
            chillingTitle: "Chilling Method",
            otherNotesTitle: "Other Key Notes",
            placeholderSelect: "Select a cookie style above to see the magic happen! ✨",
            tipsTitle: "💡 Pro Tips & Science! 🔬",
            recipeTitlePrefix: "Recipe for:",
            ingredientsHeader: "Key Ingredients & Variations:",
            stepsHeader: "Your Baking Steps:",
            // Cookie Specific Data
            cookies: {
                classic: {
                    name: "Classic Balanced",
                    theme: "classic-theme",
                    butterMethod: "Use <span class='highlight'>COOOLED but LIQUID</span> Brown Butter. Whisk with sugars (no creaming).",
                    chillingMethod: "<span class='highlight'>RECOMMENDED Chill:</span> 30 mins - 24 hrs. Improves flavor and texture.",
                    otherNotes: "Use ~2 1/2 cups (300g) flour. Include 1/2 tsp baking powder.",
                    // --- Recipe Details ---
                    ingredients: [
                        { key: 'butter', emoji: '🧈', text: 'Brown Butter: <span class="highlight critical">COOOLED but LIQUID</span>' },
                        { key: 'sugar', emoji: '🍬', text: 'Sugars: 1 1/4c (250g) Brown, 1/2c (100g) Granulated' },
                        { key: 'flour', emoji: '🍚', text: 'Flour: ~2 1/2 cups (300g) All-Purpose' },
                        { key: 'leavening', emoji: '✨', text: 'Leaveners: 1 tsp Baking Soda + <span class="highlight">1/2 tsp Baking Powder</span>' },
                        { key: 'choco', emoji: '🍫', text: 'Chocolate: 1.5 - 2 cups (255-340g)'},
                        { key: 'eggs', emoji: '🥚', text: 'Eggs: 2 Large'},
                        { key: 'vanilla', emoji: '🏺', text: 'Vanilla: 2 tsp'},
                        { key: 'salt', emoji: '🧂', text: 'Salt: 1 tsp Kosher (or 1/2 tsp table)'},
                        { key: 'milkpowder', emoji: '🥛', text: 'Optional Toasted Milk Powder: 3-4 Tbsp'}
                    ],
                    steps: [
                        'Follow universal prep: Brown butter, Toast milk powder (opt.), Mix dry ingredients (flour, soda, powder, salt, milk powder).',
                        'Ensure butter is <span class="highlight critical">cooled but liquid</span>.',
                        'In a large bowl, <span class="highlight">WHISK</span> liquid butter with sugars until combined.',
                        'Beat in eggs one at a time, then vanilla.',
                        'Gradually mix in dry ingredients until JUST combined. <span class="critical">Do NOT overmix!</span>',
                        'Stir in chocolate chips/chunks.',
                        '<span class="highlight critical">CHILL DOUGH</span> (covered) for at least <span class="highlight">30 mins</span>, up to 24 hours.',
                        'Preheat oven to <span class="highlight">375°F (190°C)</span>. Line baking sheets.',
                        'Scoop <span class="highlight">~2 Tbsp</span> balls. Optional: flaky salt on top.',
                        'Bake <span class="highlight">10-12 minutes</span> until edges are set.',
                        'Cool on pan 5-10 mins, then transfer to wire rack.'
                    ]
                },
                thick: {
                    name: "Thick & Gooey",
                    theme: "thick-theme",
                    butterMethod: "Use <span class='highlight critical'>CHILLED SOLID</span> Brown Butter. <span class='highlight critical'>Cream</span> with sugars until fluffy.",
                    chillingMethod: "<span class='highlight critical'>MANDATORY Chill:</span> 24 - 72 hrs. The SECRET to thickness & flavor!",
                    otherNotes: "Use <span class='highlight'>MORE flour</span> (310-330g). Include 1/2 tsp baking powder. <span class='highlight'>Opt: 1-2 Tbsp Cornstarch</span> for softness.",
                     ingredients: [
                        { key: 'butter', emoji: '🧈', text: 'Brown Butter: <span class="highlight critical">CHILLED SOLID (scoopable)</span>' },
                        { key: 'sugar', emoji: '🍬', text: 'Sugars: Increase Brown? (e.g., 1 1/2c / 300g), Decrease White? (e.g., 1/4c / 50g)' },
                        { key: 'flour', emoji: '🍚', text: 'Flour: <span class="highlight">MORE ~2 1/2 - 2 3/4 cups (310-330g)</span> All-Purpose' },
                         { key: 'starch', emoji: '⭐', text: 'Optional Cornstarch: 1-2 Tbsp (adds softness)'},
                        { key: 'leavening', emoji: '✨', text: 'Leaveners: 1 tsp Baking Soda + <span class="highlight">1/2 tsp Baking Powder</span>' },
                        { key: 'choco', emoji: '🍫', text: 'Chocolate: <span class="highlight">Generous! 2+ cups (340g+)</span>'},
                         { key: 'eggs', emoji: '🥚', text: 'Eggs: 2 Large'},
                        { key: 'vanilla', emoji: '🏺', text: 'Vanilla: 2 tsp'},
                        { key: 'salt', emoji: '🧂', text: 'Salt: 1 tsp Kosher (or 1/2 tsp table)'},
                        { key: 'milkpowder', emoji: '🥛', text: 'Optional Toasted Milk Powder: 3-4 Tbsp'}
                    ],
                     steps: [
                        'Follow universal prep: Brown butter, Toast milk powder (opt.), Mix dry ingredients (flour, soda, powder, salt, milk powder, <span class="highlight">cornstarch if using</span>).',
                        'Ensure butter is <span class="highlight critical">chilled until solid</span> but scoopable.',
                        'In a stand mixer or with hand mixer, <span class="highlight critical">CREAM</span> solid butter with sugars until light & fluffy (3-5 mins).',
                         'Beat in eggs one at a time, then vanilla.',
                        'Gradually mix in <span class="highlight">higher amount</span> of dry ingredients until JUST combined. <span class="critical">Do NOT overmix!</span>',
                        'Stir in a <span class="highlight">generous</span> amount of chocolate.',
                        '<span class="highlight critical">CHILL DOUGH (MANDATORY)</span> covered for <span class="highlight critical">24 - 72 hours</span>.',
                        'Preheat oven to <span class="highlight">375°F (190°C)</span> (or start hotter briefly). Line baking sheets.',
                        'Scoop <span class="highlight critical">LARGE (~3-4 Tbsp)</span> balls. <span class="highlight">Keep tall!</span> Optional: flaky salt.',
                        'Bake <span class="highlight">12-15 minutes</span>. Edges set, centers look <span class="highlight">soft/underdone</span>.',
                        'Cool on pan <span class="highlight critical">10-15 mins</span>, then transfer to wire rack.'
                    ]
                },
                 thin: {
                    name: "Thin & Crispy",
                     theme: "thin-theme",
                     butterMethod: "Use <span class='highlight critical'>WARM LIQUID</span> Brown Butter. Whisk with sugars.",
                     chillingMethod: "<span class='highlight critical'>SKIP Chilling!</span> Bake immediately for maximum spread.",
                     otherNotes: "Use <span class='highlight'>LESS flour</span> (280-300g). <span class='highlight critical'>OMIT baking powder.</span> Increase Granulated Sugar for crispness. <span class='highlight'>Opt: 1-2 Tbsp Milk</span> for extra spread.",
                     ingredients: [
                        { key: 'butter', emoji: '🧈', text: 'Brown Butter: <span class="highlight critical">WARM LIQUID</span>' },
                        { key: 'sugar', emoji: '🍬', text: 'Sugars: <span class="highlight">Increase White</span> (e.g., 1 1/4c / 250g), <span class="highlight">Decrease Brown</span> (e.g., 1/2c / 100g) for crispness.' },
                        { key: 'flour', emoji: '🍚', text: 'Flour: <span class="highlight">LESS ~2 1/4 - 2 1/2 cups (280-300g)</span> All-Purpose' },
                         { key: 'leavening', emoji: '✨', text: 'Leaveners: 1 tsp Baking Soda ONLY. <span class="highlight critical">NO Baking Powder</span>' },
                         { key: 'extra', emoji: '💧', text: 'Optional Extra Liquid: 1-2 Tbsp Milk (for spread)'},
                        { key: 'choco', emoji: '🍫', text: 'Chocolate: ~1.5 cups (255g)'},
                        { key: 'eggs', emoji: '🥚', text: 'Eggs: 2 Large (+ Optional extra Yolk)'},
                        { key: 'vanilla', emoji: '🏺', text: 'Vanilla: 2 tsp'},
                        { key: 'salt', emoji: '🧂', text: 'Salt: 1 tsp Kosher (or 1/2 tsp table)'},
                        { key: 'milkpowder', emoji: '🥛', text: 'Optional Toasted Milk Powder: 3-4 Tbsp'}
                     ],
                     steps: [
                         'Follow universal prep: Brown butter, Toast milk powder (opt.), Mix dry ingredients (flour, <span class="highlight">soda ONLY</span>, salt, milk powder).',
                        'Ensure butter is <span class="highlight critical">warm liquid</span> (not hot).',
                        'In a large bowl, <span class="highlight">WHISK</span> warm butter with sugars (<span class="highlight">adjusted ratio</span>) until combined.',
                        'Beat in eggs, vanilla, and <span class="highlight">optional milk/yolk</span>.',
                        'Gradually mix in <span class="highlight">lower amount</span> of dry ingredients until JUST combined. <span class="critical">Do NOT overmix!</span>',
                        'Stir in chocolate chips/chunks.',
                        '<span class="highlight critical">DO NOT CHILL.</span> Proceed directly to baking.',
                         'Preheat oven to <span class="highlight">350°F (175°C)</span>. Line baking sheets.',
                        'Scoop <span class="highlight">smaller (~1.5-2 Tbsp)</span> balls. Place far apart. Can flatten slightly.',
                         'Bake <span class="highlight">12-15 minutes</span> until golden brown all over for crispness.',
                        'Cool on pan 5 mins, then transfer to wire rack. They crisp as they cool.'
                    ]
                }
            },
            // Common Tips (Key-Value pairs for easy iteration)
            tips: [
                { key: 'tip1', emoji: '🍫', text: 'Use Quality Chocolate: Mix chopped bars & chips!' },
                { key: 'tip2', emoji: '⚖️', text: 'Weigh Flour: Grams > Cups for consistency.' },
                { key: 'tip3', emoji: '🚫', text: 'Don\'t Overmix: Stop when flour disappears = Tender cookies.' },
                { key: 'tip4', emoji: '🧊', text: 'Chill Power: Hydrates flour, builds flavor, controls spread.' },
                { key: 'tip5', emoji: '🥄', text: 'Uniform Scoops: Use a scoop for even baking.' },
                { key: 'tip6', emoji: '🧂', text: 'Flaky Salt Finish: Sprinkle before baking enhances flavor.' },
                { key: 'tip7', emoji: '💥', text: 'Pan Banging (Optional): Creates ripples (bang pan mid-bake).' },
                { key: 'tip8', emoji: '⏳', text: 'Cooling Time Matters: Let set on pan 5-10 mins before moving.' },
                 { key: 'sci1', emoji: '🔥', text: 'Brown Butter Science: Maillard reaction = nutty flavor!' },
                 { key: 'sci2', emoji: '🥛', text: 'Toasted Milk Powder: More Maillard! Extra chew.' },
                 { key: 'sci3', emoji: '🧪', text: 'Leaveners: Soda needs acid (brown sugar), promotes spread. Powder adds lift.' }
            ]
        },
        ar: {
             // UI Text - Arabic (Egyptian)
            mainTitle: "🍪 الدليل التفاعلي لكوكيز الشوكولاتة 🍪",
            yieldInfo: "الكمية: حوالي 18-24 قطعة",
            chooseStyle: "اختر ستايل الكوكيز:",
            typeClassic: "كلاسيك متوازن",
            typeThick: "سميكة وطرية",
            typeThin: "رفيعة ومقرمشة",
            keyDifferencesTitle: "🔑 الفروقات الأساسية لكوكيز",
            butterTitle: "حالة الزبدة والخلط",
            chillingTitle: "طريقة التبريد",
             otherNotesTitle: "ملاحظات هامة أخرى",
            placeholderSelect: "اختار نوع الكوكيز فوق عشان تشوف السحر! ✨",
            tipsTitle: "💡 نصائح احترافية وعلم الخبز! 🔬",
             recipeTitlePrefix: "وصفة كوكيز:",
             ingredientsHeader: "المكونات الأساسية والفروقات:",
            stepsHeader: "خطوات الخبز:",
             // Cookie Specific Data - Arabic
             cookies: {
                classic: {
                    name: "الكلاسيك المتوازن",
                     theme: "classic-theme",
                    butterMethod: "استخدم زبدة بنية <span class='highlight'>مبردة لكن سائلة</span>. اخفقها بالسلك مع السكر (بدون خفق كريمي).",
                    chillingMethod: "<span class='highlight'>تبريد مُوصى به:</span> 30 دقيقة - 24 ساعة. يحسن النكهة والقوام.",
                     otherNotes: "استخدم حوالي 2.5 كوب (300 جم) دقيق. أضف 1/2 م.ص بيكنج بودر.",
                     ingredients: [
                         { key: 'butter', emoji: '🧈', text: 'زبدة بنية: <span class="highlight critical">مبردة لكن سائلة</span>' },
                        { key: 'sugar', emoji: '🍬', text: 'السكر: 1 و 1/4 كوب (250 جم) بني، 1/2 كوب (100 جم) أبيض' },
                         { key: 'flour', emoji: '🍚', text: 'دقيق: ~2.5 كوب (300 جم) لجميع الأغراض' },
                         { key: 'leavening', emoji: '✨', text: 'المواد الرافعة: 1 م.ص بيكنج صودا + <span class="highlight">1/2 م.ص بيكنج بودر</span>' },
                         { key: 'choco', emoji: '🍫', text: 'شوكولاتة: 1.5 - 2 كوب (255-340 جم)'},
                         { key: 'eggs', emoji: '🥚', text: 'بيض: 2 كبير'},
                         { key: 'vanilla', emoji: '🏺', text: 'فانيليا: 2 م.ص'},
                         { key: 'salt', emoji: '🧂', text: 'ملح: 1 م.ص كوشير (أو 1/2 م.ص ناعم)'},
                        { key: 'milkpowder', emoji: '🥛', text: 'اختياري: حليب بودرة محمص: 3-4 م.ك'}
                    ],
                     steps: [
                         'اتبع التجهيزات الأساسية: حمص الزبدة، حمص الحليب البودرة (اختياري)، اخلط المكونات الجافة (دقيق، صودا، بودر، ملح، حليب بودرة).',
                         'تأكد أن الزبدة <span class="highlight critical">مبردة لكن سائلة</span>.',
                         'في وعاء كبير، <span class="highlight">اخفق بالسلك</span> الزبدة السائلة مع السكر حتى يتجانسوا.',
                         'أضف البيض واحدة تلو الأخرى، ثم الفانيليا.',
                         'أضف المكونات الجافة تدريجياً واخلط <span class="highlight">بالكاد حتى تتجانس</span>. <span class="critical">لا تفرط في الخلط!</span>',
                         'قلّب الشوكولاتة.',
                        '<span class="highlight critical">برّد العجينة</span> (مغطاة) لمدة <span class="highlight">30 دقيقة</span> على الأقل، حتى 24 ساعة.',
                         'سخن الفرن على <span class="highlight">190°م (375°ف)</span>. بطن الصواني.',
                         'شكّل كرات <span class="highlight">~2 م.ك</span>. اختياري: رش ملح خشن.',
                         'اخبز <span class="highlight">10-12 دقيقة</span> حتى تثبت الحواف.',
                         'بردها على الصينية 5-10 دقائق، ثم انقلها لرف سلكي.'
                     ]
                },
                thick: {
                    name: "السميكة والطرية",
                     theme: "thick-theme",
                     butterMethod: "استخدم زبدة بنية <span class='highlight critical'>مبردة وصلبة</span>. <span class='highlight critical'>اخفقها كريمي</span> مع السكر حتى تصبح هشة.",
                     chillingMethod: "<span class='highlight critical'>تبريد إلزامي:</span> 24 - 72 ساعة. هو <span class='highlight critical'>السر</span> للسمك والنكهة العميقة!",
                    otherNotes: "استخدم <span class='highlight'>دقيق أكثر</span> (310-330 جم). أضف 1/2 م.ص بيكنج بودر. <span class='highlight'>اختياري: 1-2 م.ك نشا</span> للطراوة.",
                    ingredients: [
                        { key: 'butter', emoji: '🧈', text: 'زبدة بنية: <span class="highlight critical">مبردة صلبة (سهلة الغرف)</span>' },
                        { key: 'sugar', emoji: '🍬', text: 'السكر: ممكن زيادة البني؟ (مثلًا 1.5ك / 300ج)، تقليل الأبيض؟ (مثلًا 1/4ك / 50ج)' },
                        { key: 'flour', emoji: '🍚', text: 'دقيق: <span class="highlight">أكثر ~2.5 - 2.75 كوب (310-330 جم)</span> لجميع الأغراض' },
                        { key: 'starch', emoji: '⭐', text: 'نشا اختياري: 1-2 م.ك (يضيف طراوة)'},
                         { key: 'leavening', emoji: '✨', text: 'المواد الرافعة: 1 م.ص بيكنج صودا + <span class="highlight">1/2 م.ص بيكنج بودر</span>' },
                        { key: 'choco', emoji: '🍫', text: 'شوكولاتة: <span class="highlight">كمية وفيرة! 2+ كوب (340+ جم)</span>'},
                         { key: 'eggs', emoji: '🥚', text: 'بيض: 2 كبير'},
                         { key: 'vanilla', emoji: '🏺', text: 'فانيليا: 2 م.ص'},
                        { key: 'salt', emoji: '🧂', text: 'ملح: 1 م.ص كوشير (أو 1/2 م.ص ناعم)'},
                        { key: 'milkpowder', emoji: '🥛', text: 'اختياري: حليب بودرة محمص: 3-4 م.ك'}
                    ],
                    steps: [
                        'اتبع التجهيزات الأساسية: حمص الزبدة، حمص الحليب البودرة (اختياري)، اخلط المكونات الجافة (دقيق، صودا، بودر، ملح، حليب بودرة، <span class="highlight">النشا إذا استخدم</span>).',
                        'تأكد أن الزبدة <span class="highlight critical">مبردة حتى تتصلب</span> ولكن سهلة الغرف.',
                        'بالمضرب الكهربائي، <span class="highlight critical">اخفق كريمي</span> الزبدة الصلبة مع السكر حتى تصبح خفيفة وهشة (3-5 دقائق).',
                         'أضف البيض واحدة تلو الأخرى، ثم الفانيليا.',
                         'أضف تدريجياً <span class="highlight">الكمية الأكبر</span> من المكونات الجافة واخلط <span class="highlight">بالكاد حتى تتجانس</span>. <span class="critical">لا تفرط في الخلط!</span>',
                        'قلّب كمية <span class="highlight">وفيرة</span> من الشوكولاتة.',
                        '<span class="highlight critical">برّد العجينة (إلزامي)</span> مغطاة لمدة <span class="highlight critical">24 - 72 ساعة</span>.',
                        'سخن الفرن على <span class="highlight">190°م (375°ف)</span> (أو ابدأ بأعلى قليلًا). بطن الصواني.',
                        'شكّل كرات <span class="highlight critical">كبيرة (~3-4 م.ك)</span>. <span class="highlight">حافظ على ارتفاعها!</span> اختياري: رش ملح خشن.',
                        'اخبز <span class="highlight">12-15 دقيقة</span>. الحواف تثبت، الوسط يبدو <span class="highlight">طريًا/غير مكتمل النضج</span>.',
                         'بردها على الصينية <span class="highlight critical">10-15 دقيقة</span>، ثم انقلها لرف سلكي.'
                     ]
                },
                thin: {
                     name: "الرفيعة والمقرمشة",
                    theme: "thin-theme",
                     butterMethod: "استخدم زبدة بنية <span class='highlight critical'>دافئة وسائلة</span>. اخفقها بالسلك مع السكر.",
                     chillingMethod: "<span class='highlight critical'>تخطَ التبريد!</span> اخبز فورًا لأقصى تمدد.",
                     otherNotes: "استخدم <span class='highlight'>دقيق أقل</span> (280-300 جم). <span class='highlight critical'>لا تستخدم بيكنج بودر.</span> زد السكر الأبيض للقرمشة. <span class='highlight'>اختياري: 1-2 م.ك حليب</span> لزيادة التمدد.",
                     ingredients: [
                         { key: 'butter', emoji: '🧈', text: 'زبدة بنية: <span class="highlight critical">دافئة وسائلة</span>' },
                         { key: 'sugar', emoji: '🍬', text: 'السكر: <span class="highlight">زد الأبيض</span> (مثلًا 1.25ك / 250ج), <span class="highlight">قلل البني</span> (مثلًا 0.5ك / 100ج) للقرمشة.' },
                         { key: 'flour', emoji: '🍚', text: 'دقيق: <span class="highlight">أقل ~2.25 - 2.5 كوب (280-300 جم)</span> لجميع الأغراض' },
                         { key: 'leavening', emoji: '✨', text: 'المواد الرافعة: 1 م.ص بيكنج صودا فقط. <span class="highlight critical">لا بيكنج بودر</span>' },
                         { key: 'extra', emoji: '💧', text: 'سائل إضافي اختياري: 1-2 م.ك حليب (للتمدد)'},
                         { key: 'choco', emoji: '🍫', text: 'شوكولاتة: ~1.5 كوب (255 جم)'},
                         { key: 'eggs', emoji: '🥚', text: 'بيض: 2 كبير (+ صفار إضافي اختياري)'},
                         { key: 'vanilla', emoji: '🏺', text: 'فانيليا: 2 م.ص'},
                        { key: 'salt', emoji: '🧂', text: 'ملح: 1 م.ص كوشير (أو 1/2 م.ص ناعم)'},
                         { key: 'milkpowder', emoji: '🥛', text: 'اختياري: حليب بودرة محمص: 3-4 م.ك'}
                     ],
                     steps: [
                         'اتبع التجهيزات الأساسية: حمص الزبدة، حمص الحليب البودرة (اختياري)، اخلط المكونات الجافة (دقيق، <span class="highlight">صودا فقط</span>، ملح، حليب بودرة).',
                         'تأكد أن الزبدة <span class="highlight critical">دافئة وسائلة</span> (ليست ساخنة).',
                         'في وعاء كبير، <span class="highlight">اخفق بالسلك</span> الزبدة الدافئة مع السكر (<span class="highlight">بالنسب المعدلة</span>) حتى يتجانسوا.',
                         'أضف البيض، الفانيليا، و <span class="highlight">الحليب/الصفار الاختياري</span>.',
                         'أضف تدريجياً <span class="highlight">الكمية الأقل</span> من المكونات الجافة واخلط <span class="highlight">بالكاد حتى تتجانس</span>. <span class="critical">لا تفرط في الخلط!</span>',
                        'قلّب الشوكولاتة.',
                        '<span class="highlight critical">لا تبرّد.</span> ابدأ الخبز فوراً.',
                        'سخن الفرن على <span class="highlight">175°م (350°ف)</span>. بطن الصواني.',
                        'شكّل كرات <span class="highlight">أصغر (~1.5-2 م.ك)</span>. ضعها متباعدة. يمكن تبطيطها قليلًا.',
                         'اخبز <span class="highlight">12-15 دقيقة</span> حتى تصبح ذهبية تمامًا للقرمشة.',
                         'بردها على الصينية 5 دقائق، ثم انقلها لرف سلكي. ستقرمش أكثر وهي تبرد.'
                     ]
                 }
            },
             // Common Tips - Arabic
            tips: [
                 { key: 'tip1', emoji: '🍫', text: 'شوكولاتة جيدة: اخلط ألواح مقطعة ورقائق!' },
                 { key: 'tip2', emoji: '⚖️', text: 'وزن الدقيق: الجرامات أدق من الأكواب.' },
                 { key: 'tip3', emoji: '🚫', text: 'لا تخلط زيادة: توقف عندما يختفي الدقيق = كوكيز طرية.' },
                 { key: 'tip4', emoji: '🧊', text: 'قوة التبريد: يرطب الدقيق، يبني النكهة، يتحكم في التمدد.' },
                 { key: 'tip5', emoji: '🥄', text: 'تشكيل متساوي: استخدم مغرفة لخبز متساوٍ.' },
                 { key: 'tip6', emoji: '🧂', text: 'لمسة ملح خشن: رشها قبل الخبز يعزز النكهة.' },
                { key: 'tip7', emoji: '💥', text: 'خبط الصينية (اختياري): يصنع تموجات (اخبط الصينية أثناء الخبز).' },
                { key: 'tip8', emoji: '⏳', text: 'وقت التبريد مهم: اتركها تستقر على الصينية 5-10 دقائق.' },
                 { key: 'sci1', emoji: '🔥', text: 'علم الزبدة البنية: تفاعل ميلارد = نكهة مكسرات!' },
                 { key: 'sci2', emoji: '🥛', text: 'حليب بودرة محمص: المزيد من ميلارد! طراوة إضافية.' },
                 { key: 'sci3', emoji: '🧪', text: 'المواد الرافعة: الصودا تحتاج حمض (سكر بني)، تساعد عالتمدد. البودر يضيف ارتفاع.' }
            ]
        }
    };

    // --- Functions ---

    function updateTextContent() {
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(el => {
            const key = el.dataset.langKey;
            if (contentData[currentLanguage] && contentData[currentLanguage][key]) {
                el.innerHTML = contentData[currentLanguage][key]; // Use innerHTML for potential tags in text
            }
             // Special handling for elements needing dynamic parts, like recipe title prefix
            if (key === 'keyDifferencesTitle' && currentCookieType) {
                 el.innerHTML = contentData[currentLanguage][key] + " " + contentData[currentLanguage].cookies[currentCookieType].name + ":";
             }
        });

         // Update title dynamically
         document.title = contentData[currentLanguage].mainTitle || "Interactive Cookie Guide";

        // Update Tips list
        tipsListContainer.innerHTML = ''; // Clear existing tips
        contentData[currentLanguage].tips.forEach(tip => {
             const li = document.createElement('li');
             li.dataset.emoji = tip.emoji; // Store emoji for CSS ::before
             li.innerHTML = tip.text; // Use innerHTML to render tags
             tipsListContainer.appendChild(li);
         });
    }


    function updateRecipeView() {
        if (!currentCookieType) {
            recipeDetailsContainer.innerHTML = `<div class="placeholder">${contentData[currentLanguage].placeholderSelect}</div>`;
             recipeDetailsContainer.className = 'recipe-container'; // Reset theme
            keyDifferencesContainer.classList.add('visually-hidden');
            return;
        }

        const recipe = contentData[currentLanguage].cookies[currentCookieType];
        recipeDetailsContainer.className = `recipe-container ${recipe.theme}`; // Apply theme class

        // Update Key Differences Section
        keyDifferencesContainer.classList.remove('visually-hidden');
         selectedCookieNameSpan.textContent = recipe.name; // Just the name here
        butterMethodDesc.innerHTML = recipe.butterMethod;
        chillingMethodDesc.innerHTML = recipe.chillingMethod;
        otherNotesDesc.innerHTML = recipe.otherNotes;


        // Build Recipe Details HTML
        let ingredientsHtml = `<h4 class="list-header">${contentData[currentLanguage].ingredientsHeader}</h4><ul class="ingredient-list">`;
        recipe.ingredients.forEach(ing => {
            ingredientsHtml += `<li class="${ing.key}" data-emoji="${ing.emoji}">${ing.text}</li>`; // Add class for potential specific icon override
        });
        ingredientsHtml += '</ul>';

        let stepsHtml = `<h4 class="list-header">${contentData[currentLanguage].stepsHeader}</h4><ol class="steps-list">`;
         recipe.steps.forEach(step => {
             stepsHtml += `<li>${step}</li>`; // innerHTML handles tags within steps
         });
        stepsHtml += '</ol>';


         recipeDetailsContainer.innerHTML = `
            <h3>${contentData[currentLanguage].recipeTitlePrefix} ${recipe.name}</h3>
            ${ingredientsHtml}
            ${stepsHtml}
        `;
    }


    function switchLanguage(lang) {
        currentLanguage = lang;
        body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        // Update button active states
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all text content & recipe view
        updateTextContent();
        updateRecipeView(); // Re-render recipe in new language
    }

    // --- Event Listeners ---

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchLanguage(button.dataset.lang);
        });
    });

    typeSelectorButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeSelectorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCookieType = button.dataset.type;
            updateTextContent(); // Ensure titles are updated if they include type name
            updateRecipeView();
        });
    });

    // --- Initial Setup ---
    switchLanguage(currentLanguage); // Set initial language view

}); // End DOMContentLoaded