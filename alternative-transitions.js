// Alternative 1: Typewriter Effect
function typewriterTransition(element, newText, isExpanded) {
    let currentText = element.textContent;
    let i = currentText.length;
    
    // Erase current text
    const eraseInterval = setInterval(() => {
        element.textContent = currentText.substring(0, i);
        i--;
        if (i < 0) {
            clearInterval(eraseInterval);
            
            // Type new text
            i = 0;
            const typeInterval = setInterval(() => {
                element.textContent = newText.substring(0, i);
                i++;
                if (i > newText.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }
    }, 30);
}

// Alternative 2: Scale/Zoom Effect
function scaleTransition(element, newText) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0.3';
    
    setTimeout(() => {
        element.textContent = newText;
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 200);
}

// Alternative 3: Slide Up Effect
function slideTransition(element, newText) {
    element.style.transform = 'translateY(-20px)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.textContent = newText;
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 250);
}

// Alternative 4: Letter-by-letter reveal
function letterRevealTransition(element, newText) {
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.textContent = newText;
        element.style.opacity = '1';
        
        // Add letter-by-letter animation
        const letters = element.textContent.split('');
        element.innerHTML = letters.map(letter => 
            `<span style="opacity: 0; animation: fadeInLetter 0.1s ease-in-out forwards;">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');
        
        // Stagger the letter animations
        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.05}s`;
        });
    }, 100);
}

// Add CSS for letter reveal animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInLetter {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style); 