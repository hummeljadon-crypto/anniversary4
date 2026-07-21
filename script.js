<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#030407" />
  <title>Happy 4 Months ❤️</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <noscript><div class="noscript">This tiny movie needs JavaScript on. 🦇</div></noscript>

  <button id="soundToggle" class="sound-toggle" type="button" aria-label="Mute sound">🔊</button>

  <main>
    <!-- PHONE WARNING -->
    <section id="phoneScene" class="scene active phone-scene">
      <div class="phone">
        <div class="status"><span>9:41</span><span>● ● ●</span></div>
        <div class="notifications">
          <article class="notification">
            <span class="notification-icon">?</span>
            <div>
              <small>UNKNOWN NUMBER</small>
              <strong>Don’t look in the mirror.</strong>
            </div>
          </article>
          <article id="secondNote" class="notification second-note">
            <span class="notification-icon">?</span>
            <div>
              <small>UNKNOWN NUMBER</small>
              <strong>Too late.</strong>
            </div>
          </article>
        </div>
        <button id="phoneBtn" class="button danger phone-btn" type="button">Continue</button>
      </div>
    </section>

    <!-- DOOR -->
    <section id="doorScene" class="scene door-scene" hidden>
      <div class="hallway">
        <div class="ceiling-light"></div>
        <div id="bathroomDoor" class="bathroom-door">
          <span class="door-number">4</span>
          <span class="door-handle"></span>
        </div>
      </div>
      <div class="bottom-copy">
        <p class="eyebrow">Bathroom</p>
        <h1>Definitely safe.</h1>
        <button id="openDoorBtn" class="button danger" type="button">Open door</button>
      </div>
    </section>

    <!-- BATHROOM -->
    <section id="bathroomScene" class="scene bathroom-scene" hidden>
      <div id="blackout" class="blackout"></div>
      <div class="bathroom">
        <div id="lamp" class="lamp"></div>

        <div id="mirror" class="mirror">
          <div id="fog" class="fog"><span>RUN</span></div>
          <div class="reflection">
            <div class="reflection-head"></div>
            <div class="reflection-body"></div>
          </div>
          <div id="mirrorGhost" class="mirror-ghost"></div>
        </div>

        <div class="sink">
          <div class="tap"></div>
          <div class="basin"></div>
          <div class="cabinet"></div>
        </div>

        <div id="lightGuide" class="light-guide" aria-hidden="true">
          <span>Start here</span>
          <i>↗</i>
        </div>
        <button id="lightSpot" class="hotspot light-spot first-hotspot" type="button">LIGHT</button>
        <button id="sinkSpot" class="hotspot sink-spot" type="button">SINK</button>
        <button id="mirrorSpot" class="hotspot mirror-spot" type="button">MIRROR</button>
      </div>

      <div class="panel">
        <p id="bathroomHint" class="eyebrow">Tap the glowing spots</p>
        <h2 id="bathroomTitle">Look around.</h2>
        <div id="exploreDots" class="dots">○ ○ ○</div>
      </div>
    </section>

    <!-- CHOICE -->
    <section id="choiceScene" class="scene choice-scene" hidden>
      <div class="choice-mirror">
        <div class="choice-glass">
          <div class="choice-reflection">
            <span class="choice-reflection-head"></span>
            <span class="choice-reflection-body"></span>
          </div>
          <div class="choice-condensation"></div>
        </div>
      </div>
      <div class="bottom-copy">
        <h1>Say her name?</h1>
        <div class="choice-buttons">
          <button id="yesBtn" class="button danger" type="button">Obviously</button>
          <button id="noBtn" class="button ghost no-btn" type="button">Nope</button>
        </div>
      </div>
    </section>

    <!-- RITUAL -->
    <section id="ritualScene" class="scene ritual-scene" hidden>
      <div id="ritualRoom" class="bathroom ritual-room">
        <div id="ritualLamp" class="lamp"></div>
        <div id="ritualMirror" class="mirror ritual-mirror">
          <div class="ritual-depth"></div>

          <div id="ritualReflection" class="ritual-person">
            <span class="ritual-person-hair"></span>
            <span class="ritual-person-head"></span>
            <span class="ritual-person-neck"></span>
            <span class="ritual-person-body"></span>
          </div>

          <div id="ritualFog" class="fog ritual-fog">
            <span class="run-r">R</span>
            <span class="run-u">U</span>
            <span class="run-n">N</span>
          </div>

          <div id="ritualGhost" class="ritual-shadow"></div>

          <div id="ritualFace" class="ritual-face">
            <span class="ritual-eye ritual-eye-left"></span>
            <span class="ritual-eye ritual-eye-right"></span>
            <span class="ritual-mouth"></span>
          </div>

          <svg class="cracks" viewBox="0 0 300 430" aria-hidden="true">
            <g fill="none" stroke="rgba(235,248,255,.96)" stroke-width="2.2">
              <path d="M150 215 L113 169 L78 122 L45 69" />
              <path d="M150 215 L167 155 L205 111 L256 73" />
              <path d="M150 215 L223 198 L278 159" />
              <path d="M150 215 L205 263 L251 318 L282 384" />
              <path d="M150 215 L142 278 L116 338 L80 401" />
              <path d="M150 215 L88 242 L42 289 L12 346" />
              <path d="M150 215 L92 196 L39 160" />
            </g>
          </svg>
        </div>
      </div>

      <div class="panel">
        <p id="ritualHint" class="eyebrow">0 of 3</p>
        <h2 id="ritualTitle">Bloody Mary.</h2>
        <button id="sayBtn" class="button ghost" type="button">Say it</button>
        <div id="maryDots" class="dots">○ ○ ○</div>
      </div>
    </section>

    <!-- CLEAR HALLWAY CHASE -->
    <section id="chaseScene" class="scene chase-scene" hidden>
      <div id="chaseHall" class="chase-hall">
        <div class="perspective-wall left-wall"></div>
        <div class="perspective-wall right-wall"></div>
        <div class="floor-lines"></div>
        <div id="exitDoor" class="exit-door">
          <span>EXIT</span>
        </div>
        <div class="chase-vanishing-point"></div>
        <div id="chaseGhost" class="chase-ghost" aria-hidden="true">
          <div class="chase-hair"></div>
          <div class="chase-face">
            <span class="chase-eye chase-eye-left"></span>
            <span class="chase-eye chase-eye-right"></span>
          </div>
          <div class="chase-body"></div>
        </div>
      </div>

      <div class="bottom-copy chase-copy">
        <p id="chaseHint" class="eyebrow">Run to the exit</p>
        <h1 id="chaseTitle" class="run-title">RUN.</h1>
        <button id="runBtn" class="button danger run-btn" type="button">RUN</button>
        <div class="meter"><span id="runMeter"></span></div>
      </div>
    </section>

    <!-- HOLD YOUR BREATH -->
    <section id="breathScene" class="scene breath-scene" hidden>
      <div class="hiding-place">
        <div class="hide-corridor">
          <div class="hide-ceiling-light"></div>
          <div class="hide-far-door"></div>
          <div class="hide-floor-lines"></div>

          <div id="distantMary" class="distant-mary" aria-hidden="true">
            <div class="hide-mary-hair"></div>
            <div class="hide-mary-face">
              <span class="hide-eye hide-eye-left"></span>
              <span class="hide-eye hide-eye-right"></span>
              <span class="hide-mouth"></span>
            </div>
            <div class="hide-mary-neck"></div>
            <div class="hide-mary-dress"></div>
            <div class="hide-mary-arm hide-mary-arm-left"></div>
            <div class="hide-mary-arm hide-mary-arm-right"></div>
          </div>
        </div>

        <div class="closet-door closet-door-left"></div>
        <div class="closet-door closet-door-right"></div>
        <div class="slit"></div>
        <div class="dark-edge left-edge"></div>
        <div class="dark-edge right-edge"></div>
      </div>

      <div class="bottom-copy breath-copy">
        <p id="breathHint" class="eyebrow">She’s searching</p>
        <h1 id="breathTitle">Hold your breath.</h1>
        <button id="breathBtn" class="button ghost breath-btn" type="button">
          HOLD
          <span id="breathFill"></span>
        </button>
      </div>
    </section>

    <!-- BAT SIGNAL -->
    <section id="signalScene" class="scene signal-scene" hidden>
      <div class="city">
        <div class="building b1"></div>
        <div class="building b2"></div>
        <div class="building b3"></div>
        <div class="building b4"></div>
      </div>
      <div id="batSignal" class="bat-signal"><span aria-hidden="true">🦇</span></div>
      <div class="bottom-copy signal-copy">
        <p class="eyebrow">Gotham-ish</p>
        <h1>She picked the wrong girlfriend.</h1>
      </div>
    </section>

    <!-- BATMAN ENTRANCE -->
    <section id="batmanScene" class="scene batman-scene" hidden>
      <div class="rooftop">
        <div id="batman" class="batman">
          <div class="hair"></div>
          <div class="mask">
            <span class="ear ear-left"></span>
            <span class="ear ear-right"></span>
            <span class="eye eye-left"></span>
            <span class="eye eye-right"></span>
            <span class="mouth"></span>
          </div>
          <div class="neck"></div>
          <div class="torso"><span>🦇</span></div>
          <div class="cape"></div>
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
        </div>
        <div id="landingDust" class="landing-dust"></div>
      </div>

      <div class="panel">
        <p class="eyebrow">Totally graceful landing</p>
        <h2 id="batmanLine">I’m her boyfriend.</h2>
        <button id="batmanBtn" class="button ghost" type="button">...</button>
      </div>
    </section>

    <!-- QUIZ BATTLE -->
    <section id="quizScene" class="scene quiz-scene" hidden>
      <div id="battleArena" class="battle-arena">
        <div id="battleBatman" class="battle-batman batman-model">
          <div class="hair"></div>
          <div class="mask">
            <span class="ear ear-left"></span>
            <span class="ear ear-right"></span>
            <span class="eye eye-left"></span>
            <span class="eye eye-right"></span>
            <span class="mouth"></span>
          </div>
          <div class="neck"></div>
          <div class="torso"><span>🦇</span></div>
          <div class="cape"></div>
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
          <div class="battle-arm"></div>
        </div>

        <div id="battleMary" class="battle-mary mary-model">
          <div class="mary-hair"></div>
          <div class="mary-face">
            <span class="mary-eye mary-eye-left"></span>
            <span class="mary-eye mary-eye-right"></span>
            <span class="mary-mouth"></span>
          </div>
          <div class="mary-neck"></div>
          <div class="mary-dress"></div>
          <div class="mary-arm mary-arm-left"></div>
          <div class="mary-arm mary-arm-right"></div>
        </div>

        <div id="bananaAttack" class="banana-attack" aria-hidden="true">
          <span class="banana banana-a">🍌</span>
          <span class="banana banana-b">🍌</span>
          <span class="banana banana-c">🍌</span>
          <span class="banana banana-giant">🍌</span>
        </div>
        <div id="impactWord" class="impact-word">WHAM</div>
      </div>

      <div class="quiz-ui">
        <p class="boss-name">BLOODY MARY · MIRROR DEMON</p>
        <div class="health"><span id="healthFill"></span></div>
        <p id="questionNumber" class="eyebrow">Question 1 of 3</p>
        <h2 id="questionText">Who loves the other more?</h2>
        <div id="answerGrid" class="answers"></div>
        <p id="answerFeedback" class="answer-feedback"></p>
      </div>
    </section>

    <!-- CINEMATIC SLIPPER FINISHER -->
    <section id="finisherScene" class="scene finisher-scene" hidden>
      <div id="cinemaBarTop" class="cinema-bar cinema-bar-top"></div>
      <div id="cinemaBarBottom" class="cinema-bar cinema-bar-bottom"></div>

      <div id="finisherArena" class="finisher-arena">
        <div class="finisher-light"></div>
        <div class="finisher-ground"></div>

        <div id="finisherBatman" class="finisher-batman batman-model">
          <div class="hair"></div>
          <div class="mask">
            <span class="ear ear-left"></span>
            <span class="ear ear-right"></span>
            <span class="eye eye-left"></span>
            <span class="eye eye-right"></span>
            <span class="mouth"></span>
          </div>
          <div class="neck"></div>
          <div class="torso"><span>🦇</span></div>
          <div class="cape"></div>
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
          <div class="throw-arm"></div>
          <div id="finalSlipper" class="final-slipper">🩴</div>
        </div>

        <div id="finisherMary" class="finisher-mary mary-model">
          <div class="mary-hair"></div>
          <div class="mary-face">
            <span class="mary-eye mary-eye-left"></span>
            <span class="mary-eye mary-eye-right"></span>
            <span class="mary-mouth"></span>
          </div>
          <div class="mary-neck"></div>
          <div class="mary-dress"></div>
          <div class="mary-arm mary-arm-left"></div>
          <div class="mary-arm mary-arm-right"></div>
        </div>

        <div id="slipperTrail" class="slipper-trail"></div>
        <div id="finisherImpact" class="finisher-impact">FINAL BONK</div>
        <div id="impactBurst" class="impact-burst"></div>
        <p id="slowMotionText" class="slow-motion-text">SLOW MOTION</p>
      </div>

      <div id="finisherCopy" class="bottom-copy finisher-copy">
        <p id="finisherEyebrow" class="eyebrow">Final move</p>
        <h1 id="finisherTitle">Ancient weapon.</h1>
        <button id="finishBtn" class="button danger" type="button">Prepare the slipper</button>
      </div>
    </section>

    <!-- INTERACTIVE HEART SPACE -->
    <section id="endingScene" class="scene ending-scene" hidden>
      <div id="floatingHearts" class="floating-heart-field"></div>
      <div class="heart-space-stars" aria-hidden="true">
        <span>✦</span><span>·</span><span>✦</span><span>·</span><span>✦</span><span>·</span>
      </div>

      <div class="heart-space-card">
        <div id="heartIntro" class="heart-intro">
          <p class="eyebrow">Okay... danger handled.</p>
          <h1>Now for the important part.</h1>
        </div>

        <div id="heartStage" class="heart-stage">
          <div id="heartAura" class="heart-aura"></div>

          <button id="holdHeartBtn" class="hold-heart" type="button" aria-label="Hold my heart">
            <span class="hold-heart-symbol">♥</span>
            <span class="hold-heart-shine"></span>
          </button>

          <svg class="heart-progress-ring" viewBox="0 0 140 140" aria-hidden="true">
            <circle class="heart-progress-track" cx="70" cy="70" r="61"></circle>
            <circle id="heartProgressCircle" class="heart-progress-value" cx="70" cy="70" r="61"></circle>
          </svg>

          <button class="month-heart month-heart-one" type="button" data-month="0" aria-label="Open month one">
            <span>1</span>
          </button>
          <button class="month-heart month-heart-two" type="button" data-month="1" aria-label="Open month two">
            <span>2</span>
          </button>
          <button class="month-heart month-heart-three" type="button" data-month="2" aria-label="Open month three">
            <span>3</span>
          </button>
          <button class="month-heart month-heart-four" type="button" data-month="3" aria-label="Open month four">
            <span>4</span>
          </button>
        </div>

        <p id="heartHint" class="heart-hint">Press and hold my heart</p>
        <p id="monthCounter" class="month-counter">Four little chapters</p>

        <div id="monthMessage" class="month-message" aria-live="polite">
          <p id="monthLabel" class="month-label"></p>
          <p id="monthText" class="month-text"></p>
        </div>

        <div id="heartFinale" class="heart-finale">
          <p class="eyebrow">Four months with you</p>
          <h1 id="endingTitle">Happy 4 months</h1>
          <h2 id="girlfriendName">baby girl ❤️</h2>
          <p class="timeline-line">And I would choose you in every timeline.</p>
          <p class="game-line">The game ends here.<br>Us, though? We are only getting started.</p>

          <div class="heart-batman" aria-hidden="true">
            <div class="heart-batman-ears"></div>
            <div class="heart-batman-head"><span></span><span></span></div>
            <div class="heart-batman-body">🦇</div>
            <div class="heart-batman-cape"></div>
          </div>

          <button id="kissBtn" class="button love" type="button">Kiss Batman</button>
          <p id="missionText" class="mission-text">Oh... and one more thing.</p>
          <button id="letterRevealBtn" class="button letter-reveal-button" type="button">What is it?</button>
        </div>
      </div>
    </section>

    <!-- BATMAN LETTER -->
    <section id="letterScene" class="scene letter-scene" hidden>
      <div class="letter-atmosphere">
        <span class="letter-bat letter-bat-one">🦇</span>
        <span class="letter-bat letter-bat-two">🦇</span>
        <span class="letter-bat letter-bat-three">🦇</span>
      </div>

      <div class="letter-heading">
        <p class="eyebrow">One last thing</p>
        <h1>A letter for you.</h1>
      </div>

      <div id="envelope" class="envelope">
        <div id="batBurst" class="bat-burst" aria-hidden="true">
          <span class="mini-bat mini-bat-1">🦇</span>
          <span class="mini-bat mini-bat-2">🦇</span>
          <span class="mini-bat mini-bat-3">🦇</span>
          <span class="mini-bat mini-bat-4">🦇</span>
          <span class="mini-bat mini-bat-5">🦇</span>
          <span class="mini-bat mini-bat-6">🦇</span>
        </div>
        <div class="envelope-back"></div>
        <div class="letter-peek"></div>
        <div class="envelope-front"></div>
        <div class="envelope-flap"></div>
        <button id="openLetterBtn" class="bat-stamp" type="button" aria-label="Open Batman letter">
          <span class="stamp-bat-logo" aria-hidden="true">🦇</span>
        </button>
      </div>

      <p id="tapStampHint" class="tap-stamp-hint">Tap the Batman stamp.</p>

      <article id="letterCard" class="letter-card" aria-live="polite">
        <div class="letter-card-stamp">🦇</div>
        <p id="letterDate" class="letter-date">21.07.2026</p>
        <p id="letterGreeting" class="letter-greeting">To my baby girl,</p>
        <p id="letterBody" class="letter-body"></p>
        <p id="letterSignoff" class="letter-signoff"></p>
        <div class="letter-heart">💜</div>
      </article>
    </section>
  </main>

  <div id="flash" class="flash"></div>
  <div id="kissTransition" class="kiss-transition" aria-hidden="true">
    <div class="kiss-bat">🦇</div>
    <div class="kiss-heart">♥</div>
    <p>One last mission...</p>
  </div>
  <div id="toast" class="toast"></div>
  <script src="script.js"></script>
</body>
</html>
