$(function() {
    const $game = $('body.game');

    const $h1 = $('h1');

    if ($h1.length) {
        const chars = $h1.text().split('');

        $h1.html(chars.map(char => {
            const freq = (Math.random() * (2 - 1) + 1).toFixed(2);
            return `<span class="flicker" data-frequency="${freq}">${char}</span>`;
        }).join(''));

        $h1.find('.flicker').each(function() {
            const freq = parseFloat($(this).attr('data-frequency'));
            $(this).css('animation-duration', `${1.5 * freq}s`);
            $(this).attr('data-letter', $(this).text());
        });
    }

    if ($game.length) {
        const $movingBackground = $('.moving-background');
        const $missionCard = $('.mission-card');
        const $missionBtn = $('.mission-change');
        const missionCards = [
            'suicide_exemple.svg',
            'exemple-2.svg',
            'bonbon_exemple.svg'
        ];
        let usedImages = [];

        function getRandomUnusedImage(excludeSuicide = false) {
            let unused = missionCards.filter(img => !usedImages.includes(img));
            if (excludeSuicide) {
                unused = unused.filter(img => !img.startsWith('suicide'));
            }
            if (unused.length === 0) return null;
            
            const idx = Math.floor(Math.random() * unused.length);
            return unused[idx];
        }

        function setMissionImage(imgName) {
            $missionCard.html(`<img src="./assets/missions/${imgName}" alt="Mission">`);

            if (imgName.startsWith('suicide')) {
                $movingBackground.attr('data-color', 'jaune-noir');

            } else if (imgName.startsWith('bonbon')) {
                $movingBackground.attr('data-color', 'vert-rose');

            } else {
                $movingBackground.attr('data-color', 'bleu-rose');
            }
        }

        const initialImage = getRandomUnusedImage(true);
        if (initialImage) {
            setMissionImage(initialImage);
            usedImages.push(initialImage);
        }

        $missionBtn.on('click', function() {
            const nextImage = getRandomUnusedImage();

            if (nextImage) {
                setMissionImage(nextImage);
                usedImages.push(nextImage);
            }
        });
    }
});