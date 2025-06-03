const { createApp } = Vue;

createApp({
    data() {
        return {
            text: '',
            theme: 'light'
        };
    },
    computed: {
        htmlOutput() {
            return marked.parse(this.text);
        },
        textLength() {
            const plainText = this.text.replace(/<[^>]*>/g, '');
            return plainText.length;
        },
        themeIcon() {
            return this.theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
    },
    mounted() {
        // Restore text from localStorage
        const saved = localStorage.getItem('markdownText');
        if (saved) this.text = saved;

        // Load saved or system theme
        const savedTheme = localStorage.getItem('theme');
        this.theme = savedTheme || 'light';
        document.documentElement.setAttribute('data-bs-theme', this.theme);
    },
    watch: {
        text(newText) {
            localStorage.setItem('markdownText', newText);
        },
        theme(newTheme) {
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-bs-theme', newTheme);
        }
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
        }
    }
}).mount('#app');