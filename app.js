$(document).ready(function () {

    let $head = $(".head");
    let $explain = $(".explain-container");
    let $type = $(".type");
    let $box = $(".weight");
    let $side = $(".side");

    const settingHeights = () => {
        $head.height($head.children().first().outerHeight(true));
        $explain.height($explain.children().first().outerHeight(true));
        $type.height($type.last().children().first().outerHeight(true));
        $box.height($box.children().first().outerHeight(true));
    }

    setTimeout(settingHeights, 0);

    let currentZarib = 0; 

    $(".bullets a").click(function (e) { 
        e.preventDefault();

        //get heights of containers
        let zarib = $(this).data("id");
        let headDiffer = $head.children().first().outerHeight() + parseFloat($head.children().first().css("margin-top"));
        let typeOneTwo = $type.children().first().outerHeight();
        let typeThree = $type.children().last().outerHeight() + parseFloat($type.children().last().css("margin-top"));
        let boxDiffer = $box.children().last().outerHeight() + parseFloat($box.children().last().css("margin-top"));
        let liHeight = $(".wrapper ul li").outerHeight();
        let explainDiffer = 0;
        for (let index = 1; index < zarib + 1; index++) {
            const $element = $explain.find(`p:nth-child(${index}`);
            explainDiffer += $element.outerHeight() + parseFloat($element.css("margin-bottom"));
        }

        $(`.bullets a:nth-child(${currentZarib + 1}) li`).removeClass("active");
        $(this).children().addClass("active");

        let to = gsap.to;

        // title moving animation
        to($head.children(), {duration: 1, y: - zarib * headDiffer});

        // type and roast animation
        to($type.children(".greedy"), {duration: 1, y: - zarib * typeOneTwo});

        // taste animation
        to($type.last().children(), {duration: 1, y: - zarib * typeThree});

        // weight animation
        to($box.children(), {duration: 1, y: -zarib * boxDiffer});

        // explaination animation
        to($explain.children(), {duration: 1, y: - explainDiffer});

        // height of explaination animation
        to($explain, {duration: 1, height: $explain.children(`p:nth-child(${zarib + 1})`).outerHeight(true)});

        // product image animation
        to($side, {duration: 1, y: - zarib * 100 + "vh"});

        let backgroundOne = [[-70, 0], [-70, -100], [0, -100], [0, -200]];
        let backgroundTwo = [[0, -100], [-100, -100], [-100, 0], [-200, 0]]
        let backgroundThree = [[0, -200], [0, -100], [-100, -100], [-100, 0]]
        const animation = (arr) => {
            let keyframesArr = [];
            if(currentZarib > zarib) {
                for (let index = currentZarib - 1; index >= zarib; index--) {
                    const element = arr[index];
                    let myObj = {duration: 1 / Math.abs(currentZarib - zarib), top: element[0] + "%", left: element[1] + "%"}
                    keyframesArr.push(myObj);
                }
            } else if(currentZarib < zarib) {
                for (let index = currentZarib + 1; index <= zarib; index++) {
                    const element = arr[index];
                    let myObj = {duration: 1 / Math.abs(currentZarib - zarib), top: element[0] + "%", left: element[1] + "%"}
                    keyframesArr.push(myObj);
                }
            }
            
            return keyframesArr;
        }

        to(".f-color", {keyframes: animation(backgroundOne), ease: "power1.out"});
        to(".inside-s-color", {keyframes: animation(backgroundTwo), ease: "power1.out"});
        to(".inside-t-color",{keyframes: animation(backgroundThree), ease: "power1.out"});

        let prices = ["25", "38", "31", "28"];
        function priceAnimation(num) {

            let priceKeyframe = [];
            if(currentZarib > zarib) {
                for (let index = currentZarib - 1; index >= zarib; index--) {
                    const element = prices[index];
                    let myObj = {duration: 1 / Math.abs(currentZarib - zarib), top: - parseFloat(element.charAt(num)) * liHeight}
                    priceKeyframe.push(myObj);
                }
            } else if(currentZarib < zarib) {
                for (let index = currentZarib + 1; index <= zarib; index++) {
                    const element = prices[index];
                    let myObj = {duration: 1 / Math.abs(currentZarib - zarib), top: - parseFloat(element.charAt(num)) * liHeight}
                    priceKeyframe.push(myObj);
                }
            }
            return priceKeyframe;
        }
        //price animations
        to(".wrapper ul:nth-child(2)", {keyframes: priceAnimation(0), ease: "power1.out"});
        to(".wrapper ul:nth-child(3)", {keyframes: priceAnimation(1), ease: "power1.out"});

        currentZarib = zarib;
        
        
    });

});
