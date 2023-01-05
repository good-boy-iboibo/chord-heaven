// global params
let interval = 2000; // ms
let tensionProb = 0;
let level = 1;
const rareNotesProb = 1/32;




const rand = (x) => {
    return Math.floor(Math.random() * x);
};

let lastRoot = '';

class Chord {
    constructor(names, tensions, level) {
        this.names = names;
        this.tensions = tensions;
        this.level = level;
    }
    generate() {
        //quality
        let ret = this.names[rand(this.names.length)];
        // tensions
        let t = [];
        this.tensions.forEach(e => {
            if (Math.random() < 1.-tensionProb) return;
            if (Array.isArray(e)) t.push(e[rand(e.length)]);
            else t.push(e);
        });
        if (t.length === 1) {
            if (['', 'm', '-', '+'].includes(ret)) {
                ret += `add${t[0]}`;
            } else if (rand(2) && t[0][0] === 'b' || t[0][0] === '#') {
                ret += t[0];
            } else {
                ret += `<sup>(${t[0]})</sup>`;
            }
        } else if (t.length) {
            (rand(2) && t.every(e => e[0] === 'b' || e[0] === '#') ?
                ret += t.join('') :
                ret += `<sup>(${t.join(',')})</sup>`
            );
        }

        // root
        while (true) {
            const root = (
                Math.random() > rareNotesProb ?
                    notes[rand(notes.length)] :
                    notes_rare[rand(notes_rare.length)]
            );
            if (root === lastRoot || root.slice(-1) === ret[0]) continue;
            ret = root + ret;
            lastRoot = root;
            break;
        }

        // console.log(ret
        //     .replaceAll('<sup>', '')
        //     .replaceAll('</sup>', ''));
        return ret;
    }
}


const chords = [
    // basic
    new Chord(['M7'], [], 0),
    new Chord(['m7'], [], 0),
    new Chord(['7'],  [], 0),

    // maj
    new Chord(
        ['', 'maj'],
        ['9', '#11'],
        1
    ),
    new Chord(
        ['M7', 'Δ7', 'Δ', 'maj7'],
        ['9', '#11', '13'],
        1
    ),
    new Chord(
        ['M9', 'Δ9', 'maj9'],
        ['#11', '13'],
        1
    ),
    new Chord(
        ['6', 'M6', 'Δ6', 'maj6'],
        ['9', '#11'],
        1
    ),
    new Chord(
        ['69', 'M69', 'Δ69', 'maj69', '6/9'],
        [],
        2
    ),
    new Chord(
        ['sus4'],
        ['9'],
        1
    ),
    new Chord(
        ['sus2'],
        ['11'],
        1
    ),

    // min
    new Chord(
        ['m', '-', 'min'],
        ['9', '11', '13'],
        1
    ),
    new Chord(
        ['m7', '-7', 'min7'],
        ['9', '11', '13'],
        1
    ),
    new Chord(
        ['m9', '-9', 'min9'],
        ['13'],
        1
    ),
    new Chord(
        ['m11', '-11', 'min11'],
        [],
        2
    ),
    new Chord(
        ['m13', '-13', 'min13'],
        [],
        2
    ),
    new Chord(
        ['m6', '-6', 'min6'],
        ['9', '11'],
        1
    ),
    new Chord(
        ['m69', '-69', 'min69', 'm6/9', '-6/9', 'min6/9'],
        [],
        2
    ),
    new Chord(
        ['msus4', '-sus2'],
        ['9'],
        2
    ),
    new Chord(
        ['msus2', '-sus2'],
        ['11'],
        2
    ),

    // dom
    new Chord(
        ['7'],
        [['b9', '9', '#9'], '#11', ['b13', '13']],
        1
    ),
    new Chord(
        ['9'],
        ['#11', ['b13', '13']],
        1
    ),
    new Chord(
        ['7-5', '7b5'],
        [['b9', '9', '#9'], ['b13', '13']],
        2
    ),
    new Chord(
        ['9-5', '9b5'],
        [['b13', '13']],
        2
    ),
    new Chord(
        ['7sus4'],
        [['b9', '9'], 'b13'],
        1
    ),
    new Chord(
        ['7sus2'],
        ['b13'],
        2
    ),
    new Chord(
        ['9sus4'],
        [],
        2
    ),
    new Chord(
        ['7b9sus4'],
        [],
        2
    ),

    // half dim
    new Chord(
        ['<sup>ø</sup>', '<sup>ø</sup>7', 'm7b5', '-7b5', 'm7-5'],
        ['9', '11', '13'],
        1
    ),
    new Chord(
        ['<sup>ø</sup>9', 'm9b5', '-9b5', 'm9-5'],
        ['13'],
        2
    ),
    new Chord(
        ['<sup>ø</sup>11', 'm11b5', '-11b5', 'm11-5'],
        [],
        2
    ),
    new Chord(
        ['<sup>ø</sup>13', 'm13b5', '-13b5', 'm13-5'],
        [],
        2
    ),

    // mM7
    new Chord(
        ['mM7', 'mΔ7', '-Δ7', '-Δ'],
        ['9', '11', '13'],
        1
    ),
    new Chord(
        ['mM9', 'mΔ9', '-Δ9'],
        ['13'],
        2
    ),
    new Chord(
        ['mM11', 'mΔ11', '-Δ11'],
        [],
        2
    ),
    new Chord(
        ['mM13', 'mΔ13', '-Δ13'],
        [],
        2
    ),

    // dim
    new Chord(
        ['<sup>o</sup>', 'dim', 'mb5', 'm-5', '-b5'],
        [],
        1
    ),
    new Chord(
        ['<sup>o</sup>7', 'dim7'],
        [],
        1
    ),
    new Chord(
        ['<sup>o</sup>9', 'dim9'],
        [],
        2
    ),

    // aug
    new Chord(
        ['aug', '+', '+5'],
        ['9', '#11'],
        1
    ),
    new Chord(
        ['aug7', '+7', '7+5', '7#5'],
        ['9', '#11'],
        2
    ),
    new Chord(
        ['aug9', '+9', '9+5', '9#5'],
        ['#11'],
        2
    ),
    new Chord(
        ['augM7', '+M7', '+Δ7', 'M7+5', 'Δ7+5', 'maj7+5', 'M7#5', 'Δ7#5', 'maj7#5'],
        ['9', '#11'],
        2
    ),
    new Chord(
        ['augM9', '+M9', '+Δ9', 'M9+5', 'Δ9+5', 'maj9+5', 'M9#5', 'Δ9#5', 'maj9#5'],
        ['#11'],
        2
    )
];


const notes = [
    'C', 'D', 'E', 'F', 'G', 'A', 'B',
    'Db', 'Eb', 'Gb', 'Ab', 'Bb',
    'C#', 'D#',  'F#', 'G#', 'A#',
]
const notes_rare = [
    'Cb', 'Fb', 'E#', 'B#',
];


let lastQual = '';

const showChord = () => {
    let chordObj;
    while (true) {
        chordObj = chords[rand(chords.length)];
        if (chordObj.level <= level && chordObj.names[0] !== lastQual) {
            lastQual = chordObj.names[0];
            break;
        }
    }
    const str = chordObj.generate()
        .replaceAll('b', flatTag)
        .replaceAll('#', sharpTag);
    document.getElementById('chord').innerHTML = str;
};


let flatTag, sharpTag;
let timerID;
let lastUpdate = 0;
window.onload = () => {

    const elem = document.getElementById('chord');
    const color = window.getComputedStyle(elem).color;
    /*
    flat:  https://upload.wikimedia.org/wikipedia/commons/b/ba/Flat.svg
    sharp: https://upload.wikimedia.org/wikipedia/commons/a/a6/Sharp.svg
    */
    const flat = `\
    <svg version="1.0" viewBox="0 0 6 13" xmlns="http://www.w3.org/2000/svg">\
    <g transform="translate(0 -1.5301)">\
    <g transform="translate(-94.947,-433.75)">\
    <path fill="${color}" d="m98.166 443.66c0 0.575-0.21558 1.1257-0.807 1.8649-0.62656 0.78306-1.154 1.2312-1.849 1.7582v-3.4321c0.158-0.399 0.391-0.722 0.7-0.97 0.308-0.247 0.62-0.371 0.936-0.371 0.522 0 0.853 0.296 0.996 0.886 0.016 0.048 0.024 0.136 0.024 0.264zm-0.075-2.4c-0.431 0-0.869 0.119-1.315 0.358-0.446 0.238-0.868 0.557-1.266 0.954v-7.2717h-0.563v12.455c0 0.352 0.096 0.528 0.288 0.528 0.111 0 0.24891-0.093 0.455-0.216 0.58334-0.34815 0.94694-0.58081 1.342-0.82625 0.45062-0.27996 0.958-0.60688 1.629-1.2469 0.463-0.465 0.798-0.934 1.006-1.406 0.207-0.473 0.311-0.941 0.311-1.406 0-0.688-0.183-1.177-0.549-1.466-0.414-0.304-0.861-0.456-1.338-0.456z"/>\
    </g>\
    </g>\
    </svg>\
    `;
    const sharp = `\
    <svg version="1.0" viewBox="0 0 6 19" xmlns="http://www.w3.org/2000/svg">\
    <g transform="translate(0 .765)">\
    <g transform="translate(-84.196 -436.07)">\
    <path fill="${color}" d="m86.102 447.46v-4.704l2-0.552v4.68l-2 0.576zm3.938-1.138-1.375 0.394v-4.68l1.375-0.384v-1.944l-1.375 0.384v-4.7818h-0.563v4.9268l-2 0.575v-4.6498h-0.531v4.8268l-1.375 0.385v1.948l1.375-0.384v4.671l-1.375 0.383v1.94l1.375-0.384v4.7548h0.531v-4.9248l2-0.55v4.6258h0.563v-4.7998l1.375-0.385v-1.947z"/>\
    </g>\
    </g>\
    </svg>\
    `;
    flatTag  = `<img src='data:image/svg+xml;base64,${btoa(flat)}'  class='flat'  alt='b' />`;
    sharpTag = `<img src='data:image/svg+xml;base64,${btoa(sharp)}' class='sharp' alt='#' />`;


    const intervalSlider = document.getElementById('interval');
    intervalSlider.oninput = () => {
        const x = intervalSlider.value;
        interval = 2000. * (1.078125 ** (x<0? -((-x)**1.875): x));
        document.getElementById('interval-label').textContent
            = `${(interval / 1000).toFixed(2)}s`;
        (async () => {
            return clearInterval(timerID);
        })().then(() => {
            if (f) timerID = setInterval(showChord, interval);
        });
    };

    const tensionSlider = document.getElementById('tension');
    tensionSlider.oninput = () => {
        tensionProb = tensionSlider.value;
        document.getElementById('tension-label').textContent
            = `${Math.floor((tensionProb * 100))}%`;
    };

    const levelRadios = document.querySelectorAll("[name=level]");
    levelRadios.forEach(e => {
        e.onchange = () => {
            level = e.value;
            if (f) showChord();
        }
    });


    showChord();
    timerID = setInterval(showChord, interval);
}


let f = true; // true: running, false: pausing
const toggle = () => {
    if (f) {
        clearInterval(timerID);
        document.getElementById('chord').classList.add('paused');
    }
    else {
        showChord();
        timerID = setInterval(showChord, interval);
        document.getElementById('chord').classList.remove('paused');
    }
    f = !f;
};

document.onkeydown = key => {
    if (key.code === 'Space' || key.code === 'Enter') toggle();
};
