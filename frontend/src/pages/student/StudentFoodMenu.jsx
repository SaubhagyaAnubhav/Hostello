import React, { useState } from 'react';
import {
    Sun,
    CloudSun,
    Sunset,
    Moon,
    Info,
    Calendar,
    Clock3,
    Sparkles
} from 'lucide-react';

const menuData = {
    Monday: {
        special: null,
        breakfast: { main: 'Poha', extras: 'Matki Tari Rassa' },
        lunch: { dal: 'Dal Masoor', veg: 'Soya Mutter Masala', carbs: 'Jeera Rice, Ghee Roti', sides: 'Green Salad / Papad, Pickle, Butter Milk' },
        snacks: { main: 'Maggi Masala', extras: 'Tea, Tang Orange' },
        dinner: { dal: 'Dal Palak', veg: 'Tawa Veg', carbs: 'Plain Rice, Ghee Roti', sides: 'Salad / Papad, Pickle, Curd, Milk' }
    },
    Tuesday: {
        special: null,
        breakfast: { main: 'Aloo Pyaz Paratha', extras: 'Curd, Pickle' },
        lunch: { dal: 'Dal Toor Tadka', veg: 'Garlic Paneer', carbs: 'Steam Rice, Ghee Roti', sides: 'Salad / Fryums, Pickle, Curd' },
        snacks: { main: 'Mix Veg Pakoda', extras: 'Tomato Ketchup / Chutney, Tea, Sweetcorn Soup' },
        dinner: { dal: 'Dal Fry', veg: 'Veg Kofta Curry', carbs: 'Jeera Rice, Ghee Roti', sides: 'Shahi Tukda, Green Salad / Fryums, Pickle, Mix Veg Raita, Milk' }
    },
    Wednesday: {
        special: null,
        breakfast: { main: 'Idli', extras: 'Sambhar / Chutney' },
        lunch: { dal: 'Dal Makhani', veg: 'Aloo Palak Dry', carbs: 'Coriander Rice, Ghee Roti', sides: 'Salad / Fryums, Pickle, Cucumber Raita' },
        snacks: { main: 'Pasta White Sauce', extras: 'Tea, Limbu Pani' },
        dinner: { dal: 'Chana Dal', veg: 'Soya Kheema', carbs: 'Steam Rice, Ghee Roti', sides: 'Green Salad / Fryums, Pickle, Curd, Milk' }
    },
    Thursday: {
        special: 'Gudhi Padva Special',
        breakfast: { main: 'Veg Mayyo Sandwich', extras: 'Tomato Sauce' },
        lunch: { dal: 'Amti', veg: 'Batata Bhaji', carbs: 'Veg Pulao, Poori', sides: 'Kurdai Papad, Thecha, Shreekhand' },
        snacks: { main: 'Aloo Chana Chaat', extras: 'Tea, Hot & Sour Soup' },
        dinner: { dal: 'Dal Tadka', veg: 'Baingan Bhartha', carbs: 'Jeera Rice, Ghee Roti', sides: 'Salad / Papad, Pickle, Boondi Raita, Milk' }
    },
    Friday: {
        special: null,
        breakfast: { main: 'Vermicelli Upma', extras: 'Chutney' },
        lunch: { dal: 'Dal Palak', veg: 'Mushroom Dyo Pyaza', carbs: 'Jeera Rice, Ghee Roti', sides: 'Salad / Papad, Pickle, Butter Milk' },
        snacks: { main: 'Bombay Sandwich', extras: 'Green Chutney, Tea, Rose Water' },
        dinner: { dal: 'Dal Methi', veg: 'Aloo Corn Palak', carbs: 'Plain Rice, Ghee Roti', sides: 'Green Salad, Fryums, Pickle, Curd, Milk' }
    },
    Saturday: {
        special: 'ID Special',
        breakfast: { main: 'Poha Shushila', extras: 'Matki Tari Rassa' },
        lunch: { dal: '-', veg: 'Gobi Mussalam', carbs: 'Paneer Biryani, Masala Ghee Roti', sides: 'Salad / Papad, Pickle, Mix Veg Raita' },
        snacks: { main: 'Kachhi Dabeli', extras: 'Tea, Veg Manchow Soup' },
        dinner: { dal: 'Dal Moong Tadka', veg: 'Pindi Chole', carbs: 'Lemon Rice, Ghee Roti', sides: 'Curd (Dessert), Salad / Papad, Mirchi Thecha, Butter Milk, Milk' }
    },
    Sunday: {
        special: null,
        breakfast: { main: 'Missal Pav', extras: 'Farsan, Onion, Lemon' },
        lunch: { dal: 'Rajma Rasila', veg: 'Bhindi Jaypuri', carbs: 'Brown Onion Rice, Ghee Roti', sides: 'Laccha Onion Salad / Fryums, Pickle, Butter Milk' },
        snacks: { main: 'Khamang Dhokla', extras: 'Green Chutney, Tea, Ruhabza Sharbat' },
        dinner: { dal: 'Dal Lasooni', veg: 'Paneer Lawabdar', carbs: 'Veg Pulao, Ghee Roti', sides: 'Tandoori Laccha Onion, Pickle, Curd, Milk' }
    }
};

const days = Object.keys(menuData);

const mealTimings = {
    breakfast: '7:30 AM – 9:30 AM',
    lunch: '12:30 PM – 2:30 PM',
    snacks: '5:00 PM – 6:00 PM',
    dinner: '8:00 PM – 9:30 PM'
};

const splitItems = (value = '') =>
    value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const getCurrentDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return days.includes(today) ? today : 'Monday';
};

const getMealBadges = (meal) => {
    const text = Object.values(meal).join(' ').toLowerCase();
    const badges = ['Veg'];

    if (/(paneer|soya|soy|rajma|chana|dal|moong|makhani)/.test(text)) {
        badges.push('High Protein');
    }

    if (/(milk|curd|butter|ghee|raita|shreekhand)/.test(text)) {
        badges.push('Contains Dairy');
    }

    if (/(rice|roti|paratha|pulao|biryani|poori|pav|maggi|pasta)/.test(text)) {
        badges.push('Carb Rich');
    }

    return badges.slice(0, 3);
};

const tagStyles = {
    breakfast: 'bg-amber-50 text-amber-700 border-amber-100',
    lunch: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    snacks: 'bg-orange-50 text-orange-700 border-orange-100',
    dinner: 'bg-slate-100 text-slate-700 border-slate-200'
};

const cardTheme = {
    breakfast: {
        bar: 'bg-amber-300',
        iconWrap: 'bg-amber-50 group-hover:bg-amber-100',
        iconColor: 'text-amber-500'
    },
    lunch: {
        bar: 'bg-amber-500',
        iconWrap: 'bg-yellow-50 group-hover:bg-yellow-100',
        iconColor: 'text-yellow-600'
    },
    snacks: {
        bar: 'bg-orange-400',
        iconWrap: 'bg-orange-50 group-hover:bg-orange-100',
        iconColor: 'text-orange-500'
    },
    dinner: {
        bar: 'bg-slate-800',
        iconWrap: 'bg-slate-100 group-hover:bg-slate-200',
        iconColor: 'text-slate-700'
    }
};

const MealCard = ({
    title,
    icon: Icon,
    mealKey,
    time,
    badges,
    primaryItems = [],
    carbItems = [],
    extraItems = [],
    labelOne = 'Main Course',
    labelTwo = 'Breads & Rice',
    labelThree = 'Accompaniments'
}) => {
    const theme = cardTheme[mealKey];

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
            <div className={`absolute inset-x-0 top-0 h-1 ${theme.bar}`}></div>

            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`rounded-2xl p-3 transition-colors duration-300 ${theme.iconWrap}`}>
                        <Icon className={`h-5 w-5 ${theme.iconColor}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                            <Clock3 className="h-4 w-4" />
                            {time}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {badges.map((badge) => (
                    <span
                        key={badge}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${tagStyles[mealKey]}`}
                    >
                        {badge}
                    </span>
                ))}
            </div>

            <div className="space-y-5">
                <div>
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        {labelOne}
                    </span>
                    <div className="space-y-2">
                        {primaryItems.map((item) => (
                            <p key={item} className="text-base font-semibold text-slate-900">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>

                {carbItems.length > 0 && (
                    <div>
                        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            {labelTwo}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {carbItems.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {extraItems.length > 0 && (
                    <div className="border-t border-slate-100 pt-4">
                        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            {labelThree}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {extraItems.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const FoodMenuSection = () => {
    const currentDay = getCurrentDay();
    const [activeDay, setActiveDay] = useState(currentDay);

    const todayData = menuData[activeDay];
    const isViewingToday = activeDay === currentDay;

    const breakfastStaples = splitItems(
        'Tea / Coffee, Mix Fruits, Chocos / Cornflakes, Bread Butter Jam, Hot Milk'
    );

    return (
        <section id="food-menu" className="pt-2 pb-8 lg:pt-3 lg:pb-20 bg-slate-50 font-sans">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
                <div className="mb-6 text-center">
                    <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-amber-500/10 p-3 text-amber-600">
                        <Calendar className="h-8 w-8" />
                    </div>

                    <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Weekly Food Menu
                    </h2>

                    <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                        Hostello Kitchen — nutritious, hygienic, and freshly prepared meals served
                        throughout the week for students.
                    </p>
                </div>

                
                <div className="mb-8 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                                    {isViewingToday ? 'Today’s Menu' : `${activeDay} Menu`}
                                </span>
                                {todayData.special && (
                                    <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700">
                                        Festival / Special Menu
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900">
                                {activeDay}
                                {isViewingToday && (
                                    <span className="ml-2 text-amber-600">• Live for today</span>
                                )}
                            </h3>

                            <p className="mt-1 text-sm text-slate-600">
                                Breakfast, lunch, snacks, and dinner with a clean hostel-style.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 rounded-2xl border border-amber-100 bg-white px-4 py-3 shadow-sm">
                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Sparkles className="h-4 w-4 text-amber-500" />
                                {todayData.special ? 'Special Highlight' : 'Daily Highlight'}
                            </span>
                            <p className="text-sm text-slate-600">
                                {todayData.special
                                    ? todayData.special
                                    : `${todayData.lunch.veg} + ${todayData.dinner.veg}`}
                            </p>
                        </div>
                    </div>
                </div>

                
                <div className="hide-scrollbar mb-8 flex gap-2 overflow-x-auto px-1 pb-2 lg:justify-center">
                    {days.map((day) => {
                        const isActive = activeDay === day;
                        const isToday = currentDay === day;

                        return (
                            <button
                                key={day}
                                onClick={() => setActiveDay(day)}
                                className={`group whitespace-nowrap rounded-2xl border px-5 py-3 text-sm font-bold transition-all duration-300 ${
                                    isActive
                                        ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                                        : 'border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 hover:shadow-md'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    {day}
                                    {isToday && (
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}
                                        >
                                            Today
                                        </span>
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>

                
                {todayData.special && (
                    <div className="mb-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-4 text-center font-bold text-white shadow-lg">
                        <Sparkles className="h-5 w-5" />
                        <span>Today’s Special:</span>
                        <span className="rounded-lg bg-white/20 px-3 py-1 backdrop-blur-sm">
                            {todayData.special}
                        </span>
                    </div>
                )}

                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <MealCard
                        title="Breakfast"
                        icon={Sun}
                        mealKey="breakfast"
                        time={mealTimings.breakfast}
                        badges={getMealBadges(todayData.breakfast)}
                        primaryItems={[todayData.breakfast.main]}
                        carbItems={[]}
                        extraItems={[
                            ...splitItems(todayData.breakfast.extras),
                            ...breakfastStaples
                        ]}
                        labelOne="Hot Food"
                        labelTwo=""
                        labelThree="Extras & Daily Staples"
                    />

                    <MealCard
                        title="Lunch"
                        icon={CloudSun}
                        mealKey="lunch"
                        time={mealTimings.lunch}
                        badges={getMealBadges(todayData.lunch)}
                        primaryItems={[
                            todayData.lunch.veg,
                            ...(todayData.lunch.dal !== '-' ? [todayData.lunch.dal] : [])
                        ]}
                        carbItems={splitItems(todayData.lunch.carbs)}
                        extraItems={splitItems(todayData.lunch.sides)}
                        labelOne="Main Course"
                        labelTwo="Breads & Rice"
                        labelThree="Accompaniments"
                    />

                    <MealCard
                        title="Evening Snacks"
                        icon={Sunset}
                        mealKey="snacks"
                        time={mealTimings.snacks}
                        badges={getMealBadges(todayData.snacks)}
                        primaryItems={[todayData.snacks.main]}
                        carbItems={[]}
                        extraItems={splitItems(todayData.snacks.extras)}
                        labelOne="Snack Item"
                        labelTwo=""
                        labelThree="Beverages & Extras"
                    />

                    <MealCard
                        title="Dinner"
                        icon={Moon}
                        mealKey="dinner"
                        time={mealTimings.dinner}
                        badges={getMealBadges(todayData.dinner)}
                        primaryItems={[todayData.dinner.veg, todayData.dinner.dal]}
                        carbItems={splitItems(todayData.dinner.carbs)}
                        extraItems={splitItems(todayData.dinner.sides)}
                        labelOne="Main Course"
                        labelTwo="Breads & Rice"
                        labelThree="Accompaniments"
                    />
                </div>

                
                <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white p-2 text-blue-600 shadow-sm">
                            <Info className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-900">
                                Dining Note
                            </h4>
                            <p className="text-sm leading-6 text-slate-600">
                                Meals are prepared with hygiene and nutrition in mind. Menu items may
                                change based on ingredient availability. Students with allergies or
                                dietary restrictions should inform the kitchen team in advance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodMenuSection;
