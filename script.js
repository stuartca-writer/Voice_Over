/* ========================================
   MOBILE NAVIGATION
   ======================================== */

const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ========================================
   CURRENT YEAR
   ======================================== */

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ========================================
   VOICE SAMPLE EXPAND / COLLAPSE
   ======================================== */

const sampleGrid = document.getElementById('sampleGrid');
const samplesToggle = document.getElementById('samplesToggle');

if (sampleGrid && samplesToggle) {

  const sampleCards =
    sampleGrid.querySelectorAll('.sample-card');

  /* Hide arrow if there are 3 or fewer samples */

  if (sampleCards.length <= 3) {
    samplesToggle.style.display = 'none';
  }

  /* Expand / collapse samples */

  samplesToggle.addEventListener('click', () => {

    const expanded =
      sampleGrid.classList.toggle('expanded');

    samplesToggle.setAttribute(
      'aria-expanded',
      expanded
    );

    samplesToggle.setAttribute(
      'aria-label',
      expanded
        ? 'Show fewer voice samples'
        : 'Show more voice samples'
    );

    samplesToggle.textContent =
      expanded ? '↑' : '↓';
  });
}

/* ========================================
   AUTOMATIC SAMPLE NUMBERING
   ======================================== */

const sampleCards = document.querySelectorAll(
  '#sampleGrid .sample-card'
);

sampleCards.forEach((card, index) => {

  const number = card.querySelector('.sample-number');

  if (number) {
    number.textContent =
      String(index + 1).padStart(2, '0');
  }

});
/* ========================================
   AUDIO PLAYERS
   ======================================== */

document.querySelectorAll('.audio-player').forEach(player => {

  const audio = player.querySelector('audio');
  const button = player.querySelector('.play-button');
  const waveform = player.querySelector('.waveform-container');
  const progress = player.querySelector('.wave-progress');
  const timeDisplay = player.querySelector('.audio-time');


  /* Format time as minutes:seconds */

  function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
      return '0:00';
    }

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }


  /* Play / pause */

  button.addEventListener('click', () => {

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }

  });


  /* Audio duration */

  audio.addEventListener(
    'loadedmetadata',
    () => {
      timeDisplay.textContent =
        formatTime(audio.duration);
    }
  );


  /* Playback progress */

  audio.addEventListener(
    'timeupdate',
    () => {

      if (!audio.duration) {
        return;
      }

      const percentage =
        (audio.currentTime /
        audio.duration) * 100;

      progress.style.width =
        `${percentage}%`;

      timeDisplay.textContent =
        formatTime(audio.currentTime);
    }
  );


  /* Playing */

  audio.addEventListener(
    'play',
    () => {

      button.textContent = '❚❚';

      player.classList.add('playing');
    }
  );


  /* Paused */

  audio.addEventListener(
    'pause',
    () => {

      button.textContent = '▶';

      player.classList.remove('playing');
    }
  );


  /* Finished */

  audio.addEventListener(
    'ended',
    () => {

      button.textContent = '▶';

      player.classList.remove('playing');

      progress.style.width = '0%';

      timeDisplay.textContent =
        formatTime(audio.duration);
    }
  );


  /* Click waveform to seek */

  waveform.addEventListener(
    'click',
    event => {

      if (!audio.duration) {
        return;
      }

      const rect =
        waveform.getBoundingClientRect();

      const clickPosition =
        (event.clientX - rect.left) /
        rect.width;

      audio.currentTime =
        clickPosition * audio.duration;
    }
  );

});
