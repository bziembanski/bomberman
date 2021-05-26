export default class TweenHelper {
    static flashElement(scene, element, cycles, repeat = true, easing = 'Bounce', overallDuration = 200, visiblePauseDuration = 0) {
        if (scene && element) {
            let flashDuration = overallDuration - visiblePauseDuration / 2;

            scene.tweens.timeline({
                tweens: [
                    {
                        targets: element,
                        duration: 0,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 0,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: visiblePauseDuration,
                        alpha: 0,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 1,
                        ease: easing,
                        onComplete: () => {
                            if (repeat === true && cycles > 1) {
                                this.flashElement(scene, element, cycles - 1);
                            }
                        }
                    }
                ]
            });
        }
    }
}