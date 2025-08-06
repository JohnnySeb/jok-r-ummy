$(function() {
    const game = $('body.game');
    const h1 = $('h1');

    if (h1.length) {
        const chars = h1.text().split('');

        h1.html(chars.map(char => {
            const freq = (Math.random() * (2 - 1) + 1).toFixed(2);
            return `<span class="flicker" data-frequency="${freq}">${char}</span>`;
        }).join(''));

        h1.find('.flicker').each(function() {
            const freq = parseFloat($(this).attr('data-frequency'));
            $(this).css('animation-duration', `${1.5 * freq}s`);
            $(this).attr('data-letter', $(this).text());
        });
    }

    if (game.length) {
        const movingBackground = $('.moving-background');
        const pointsValue = $('.points-value');
        const missionCard = $('.mission-card');
        const missionBtn = $('.mission-change');
        const success = $('.success');
        const skip = $('.skip');
        const cancel = $('.cancel');
        const curtain = $('.curtain');
        const popup = $('.popup');

        const missionCards = [
            'bonbon_1x-suite-de-3-+-1x-3-pareilles',
            'bonbon_1x-suite-de-4',
            'bonbon_2x-3-pareilles',
            'bonbon_2x-suite-de-3',
            'carte_1x-3-pareilles-+-1x-suite-de-5',
            'carte_1x-3-pareilles-+-2x-suite-de-3',
            'carte_1x-4-pareilles-+-1x-suite-de-4-noir',
            'carte_1x-4-pareilles-+-1x-suite-de-4-rouge',
            'carte_1x-4-rouge-+-1x-4-noir',
            'carte_1x-5-pareilles-sans-frime',
            'carte_1x-suite-de-13-melange',
            'carte_1x-suite-de-5-carreau',
            'carte_1x-suite-de-5-coeur',
            'carte_1x-suite-de-5-pique',
            'carte_1x-suite-de-5-trefle',
            'carte_1x-suite-de-6-alterne',
            'carte_1x-suite-de-6-carreau',
            'carte_1x-suite-de-6-coeur',
            'carte_1x-suite-de-6-pique',
            'carte_1x-suite-de-6-trefle',
            'carte_1x-suite-de-7-noir',
            'carte_1x-suite-de-7-rouge',
            'carte_2x-3-pareilles-+-1x-suite-de-4',
            'carte_2x-3-pareilles-noir',
            'carte_2x-3-pareilles-rouge',
            'carte_2x-4-pareille',
            'carte_2x-suite-de-4',
            'carte_3x-3-pareilles',
            'carte_3x-la-royaute',
            'carte_3x-suite-de-3',
            'carte_4x-paire-impaires',
            'carte_4x-paire-paires',
            'carte_5x-as',
            'suicide_1x-suite-de-13-noir',
            'suicide_1x-suite-de-13-rouge',
            'suicide_1x-suite-de-8',
            'suicide_2x-5-pareilles',
            'suicide_3x-4-pareilles'
        ];
        let usedImages = [];

        function getRandomUnusedImage(excludeSuicide = false) {
            let unused = missionCards.filter(img => !usedImages.includes(img));
            
            if (excludeSuicide) {
                unused = unused.filter(img => !img.startsWith('suicide'));
            }

            if (unused.length === 0) {
                usedImages = [];
                unused = missionCards.slice();

                if (excludeSuicide) {
                    unused = unused.filter(img => !img.startsWith('suicide'));
                }
            }
            
            const idx = Math.floor(Math.random() * unused.length);
            return unused[idx];
        }

        function setMissionImage(imgName) {
            missionCard.html(`<img src="./assets/missions/${imgName}.svg" alt="Mission">`);

            if (imgName.startsWith('suicide')) {
                movingBackground.attr('data-color', 'jaune-noir');

            } else if (imgName.startsWith('bonbon')) {
                movingBackground.attr('data-color', 'vert-rose');

            } else {
                movingBackground.attr('data-color', 'bleu-rose');
            }
        }

        function setMissionCardWrapperHeight() {
            const $img = missionCard.find('img');

            $img.on('load', function() {
                const imgHeight = $img.height();
                missionCard.css('max-height', `${imgHeight}px`);
            });
        }

        const initialImage = getRandomUnusedImage(true);
        if (initialImage) {
            setMissionImage(initialImage);
            usedImages.push(initialImage);

            setMissionCardWrapperHeight();
        }

        missionBtn.on('click', function() {
            curtain.addClass('active');
            popup.addClass('active');
        });

        success.on('click', function() {
            const nextImage = getRandomUnusedImage();

            if (nextImage) {
                setMissionImage(nextImage);
                usedImages.push(nextImage);
            }

            setMissionCardWrapperHeight();

            const currentPoints = parseInt(pointsValue.text(), 10) || 0;
            pointsValue.text(currentPoints + 1);

            curtain.removeClass('active');
            popup.removeClass('active');
        });
        
        skip.on('click', function() {
            const nextImage = getRandomUnusedImage();

            if (nextImage) {
            setMissionImage(nextImage);
            usedImages.push(nextImage);
            }

            setMissionCardWrapperHeight();

            const currentPoints = parseInt(pointsValue.text(), 10) || 0;
            const newPoints = Math.max(0, currentPoints - 2);
            pointsValue.text(newPoints);

            curtain.removeClass('active');
            popup.removeClass('active');
        });

        cancel.on('click', function() {
            curtain.removeClass('active');
            popup.removeClass('active');
        });

        window.addEventListener('beforeunload', function (e) {
            const message = "Rafraîchir vous fera perdre tous vos points!";

            e.preventDefault();
            e.returnValue = message;

            return message;
        });
    }
});