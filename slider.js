      // Params
      let mainSliderSelector = ".main-slider",
        navSliderSelector = ".nav-slider",
        interleaveOffset = 0.5;

      // Main Slider
      let mainSliderOptions = {
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 3000,
        },

        loopAdditionalSlides: 100,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        on: {
          init: function () {
            this.autoplay.stop();
          },
          imagesReady: function () {
            this.el.classList.remove("loading");
            this.autoplay.start();
          },
          slideChangeTransitionEnd: function () {
            let swiper = this,
              captions = swiper.el.querySelectorAll(".caption");
            for (let i = 0; i < captions.length; ++i) {
              if (window.CP.shouldStopExecution(0)) break;
              captions[i].classList.remove("show");
            }
            window.CP.exitedLoop(0);
            swiper.slides[swiper.activeIndex]
              .querySelector(".caption")
              .classList.add("show");
          },
          progress: function () {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              if (window.CP.shouldStopExecution(1)) break;
              let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;

              swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                "translateX(" + innerTranslate + "px)";
            }
            window.CP.exitedLoop(1);
          },
          touchStart: function () {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              if (window.CP.shouldStopExecution(2)) break;
              swiper.slides[i].style.transition = "";
            }
            window.CP.exitedLoop(2);
          },
          setTransition: function (speed) {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              if (window.CP.shouldStopExecution(3)) break;
              swiper.slides[i].style.transition = speed + "ms";
              swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                speed + "ms";
            }
            window.CP.exitedLoop(3);
          },
        },
      };

      let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

      // Navigation Slider
      let navSliderOptions = {
        loop: true,
        loopAdditionalSlides: 100,
        speed: 1000,
        spaceBetween: 5,
        slidesPerView: 5,
        centeredSlides: false,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        direction: "vertical",
        on: {
          imagesReady: function () {
            this.el.classList.remove("loading");
          },
          click: function () {
            mainSlider.autoplay.stop();
          },
        },
      };

      let navSlider = new Swiper(navSliderSelector, navSliderOptions);

      // Matching sliders
      mainSlider.controller.control = navSlider;
      navSlider.controller.control = mainSlider;