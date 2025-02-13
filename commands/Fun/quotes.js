module.exports = {
    name: 'quote',
    description: 'Random Philosopher Quote',
    execute(message, args) {
        const philosopherQuotes = [
            "The journey of a thousand miles begins with one step. - Lao Tzu",
            "Knowing others is wisdom, knowing yourself is Enlightenment. - Lao Tzu",
            "A man who does not plan long ahead will find trouble right at his door. - Confucius",
            "The man who moves a mountain begins by carrying away small stones. - Confucius",
            "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever. - Confucius",
            "Life is really simple, but we insist on making it complicated. - Confucius",
            "When it is obvious that the goals cannot be reached, don't adjust the goals, adjust the action steps. - Confucius",
            "The superior man is modest in his speech but exceeds in his actions. - Confucius",
            "Our greatest glory is not in never falling, but in rising every time we fall. - Confucius",
            "Real knowledge is to know the extent of one's ignorance. - Confucius",
            "To be wronged is nothing unless you continue to remember it. - Confucius",
            "Silence is a true friend who never betrays. - Confucius",
            "Choose a job you love, and you will never have to work a day in your life. - Confucius",
            "The more man meditates upon good thoughts, the better will be his world and the world at large. - Confucius",
            "To see what is right and not do it is the want of courage. - Confucius",
            "I hear and I forget. I see and I remember. I do and I understand. - Confucius",
            "When we see men of worth, we should think of equaling them; when we see men of a contrary character, we should turn inwards and examine ourselves. - Confucius",
            "The superior man is modest in his speech, but exceeds in his actions. - Confucius",
            "Ignorance is the night of the mind, but a night without moon and star. - Confucius",
            "Wherever you go, go with all your heart. - Confucius",
            "Wheresoever you go, go with all your heart. - Confucius",
            "The gem cannot be polished without friction, nor man perfected without trials. - Confucius",
            "When anger rises, think of the consequences. - Confucius",
            "Better a diamond with a flaw than a pebble without. - Confucius",
            "By nature, men are nearly alike; by practice, they get to be wide apart. - Confucius",
            "When it is obvious that the goals cannot be reached, don't adjust the goals, adjust the action steps. - Confucius",
            "What you do not want done to yourself, do not do to others. - Confucius",
            "He who learns but does not think, is lost! He who thinks but does not learn is in great danger. - Confucius",
            "To see and listen to the wicked is already the beginning of wickedness. - Confucius",
            "Respect yourself and others will respect you. - Confucius",
            "The superior man understands what is right; the inferior man understands what will sell. - Confucius",
            "Without feelings of respect, what is there to distinguish men from beasts? - Confucius",
            "Study the past if you would define the future. - Confucius",
            "Success depends upon previous preparation, and without such preparation there is sure to be failure. - Confucius",
            "If you think in terms of a year, plant a seed; if in terms of ten years, plant trees; if in terms of 100 years, teach the people. - Confucius",
            "Wheresoever you go, go with all your heart. - Confucius",
            "I hear and I forget. I see and I remember. I do and I understand. - Confucius",
            "The man who asks a question is a fool for a minute, the man who does not ask is a fool for life. - Confucius",
            "To know what is right and not do it is the worst cowardice. - Confucius",
            "Real knowledge is to know the extent of one's ignorance. - Confucius",
            "When you see a good person, think of becoming like them. When you see someone not so good, reflect on your own weak points. - Confucius",
            "When it is obvious that the goals cannot be reached, don't adjust the goals, adjust the action steps. - Confucius",
            "He who learns but does not think, is lost! He who thinks but does not learn is in great danger. - Confucius",
            "The superior man is modest in his speech but exceeds in his actions. - Confucius",
            "When we see men of a contrary character, we should turn inwards and examine ourselves. - Confucius",
            "They must often change who would be constant in happiness or wisdom. - Confucius",
            "The journey of a thousand miles begins with one step. - Lao Tzu",
            "When I let go of what I am, I become what I might be. - Lao Tzu",
            "Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love. - Lao Tzu",
            "Mastering others is strength. Mastering yourself is true power. - Lao Tzu",
            "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage. - Lao Tzu",
            "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality. Let things flow naturally forward in whatever way they like. - Lao Tzu",
            "The wise man does not lay up his own treasures. The more he gives to others, the more he has for his own. - Lao Tzu",
            "To the mind that is still, the whole universe surrenders. - Lao Tzu",
            "The truth is not always beautiful, nor beautiful words the truth. - Lao Tzu",
            "Act without expectation. - Lao Tzu",
            "Nature does not hurry, yet everything is accomplished. - Lao Tzu",
            "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.' - Lao Tzu",
            "Be content with what you have; rejoice in the way things are. When you realize there is nothing lacking, the whole world belongs to you. - Lao Tzu",
            "Those who know do not speak. Those who speak do not know. - Lao Tzu",
            "Life and death are one thread, the same line viewed from different sides. - Lao Tzu",
            "Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step. - Lao Tzu"
        ]

        const randomIndex = Math.floor(Math.random() * philosopherQuotes.length);
        const randomQuote = philosopherQuotes[randomIndex];

        message.edit(randomQuote);
    },
};