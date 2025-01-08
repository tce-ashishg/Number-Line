
//view
class NumberLineView {

    constructor(model) {
        this.model = model;
        this.pointX = this.model.pointX;
        this.arrowX = this.model.pointX;
        this.animationSpeed = 0.05;
    }

    drawNumberLine() {

        //straight line on X & Y co-ordinate
        stroke(0);
        strokeWeight(1);
        line(this.model.start, this.model.pointY, this.model.end, this.model.pointY);

        //vertical line on x & y co-ordinate
        stroke(0);
        strokeWeight(1);
        line(width/2, this.model.pointY, width/2, 0);
        triangle(width/2, 0, width/2 - 5, 5, width/2+5, 5);

        //tick lines and number lable
        for (let i = -this.model.range; i <= this.model.range; i++) {
            const x = this.model.mapValueToPixel(i);
            line(x, this.model.pointY - 10, x, this.model.pointY + 10);
            fill(0);
            textAlign(CENTER, CENTER);
            text(i, x, this.model.pointY + 20);
        }

    }

    drawPoint() {
        this.pointX = lerp(this.pointX, this.arrowX, 0.5);
        fill(255, 0, 0);
        noStroke();
        ellipse(this.pointX, this.model.pointY, 15);
    }


    drawArrow() {
        const centerValue = this.model.snapToNearest();
        const additionValue = centerValue + 6;
        const subtractionValue = centerValue - 6;

        const additionPixel = this.model.mapValueToPixel(additionValue);
        const subtractionPixel = this.model.mapValueToPixel(subtractionValue);
        const centerPixel = this.model.mapValueToPixel(centerValue);

       //for animating line
       this.arrowX = lerp(this.arrowX, centerPixel, this.animationSpeed);

       const checkBoxAdd = document.getElementById("pendulum");
       const checkBoxSub = document.getElementById("pendulum2");

        if(checkBoxAdd.checked){
        //draw addition line and arrow
            stroke(0, 200, 0);
            strokeWeight(2);

            if (additionValue > this.model.range) {
                line(this.arrowX, this.model.pointY, this.model.end, this.model.pointY);
                fill(0, 200, 0);

                triangle(this.model.end, this.model.pointY, this.model.end - 10, this.model.pointY - 5, this.model.end - 10, this.model.pointY + 5);


            }
            else {
                line(this.arrowX, this.model.pointY, additionPixel, this.model.pointY);
                fill(0, 200, 0);
                triangle(additionPixel, this.model.pointY, additionPixel - 10, this.model.pointY - 5, additionPixel - 10, this.model.pointY + 5);

            }
        
            //dislying the addition 

            //ADDITION
            fill(221, 255, 221)
            stroke(0);
            rect(120, this.model.pointY + 70, 250, 80);

            fill(0);
            noStroke();
            textSize(16);
            textAlign(LEFT, CENTER);
            text(`Addition : ${centerValue} + 6 = ${additionValue}`, 130, this.model.pointY + 110);

        }

        //draw subtraction line and arrow
        if(checkBoxSub.checked){
            stroke(200, 0, 0);
            strokeWeight(2);
            if (subtractionValue < -this.model.range) {
                line(this.arrowX, this.model.pointY, this.model.start, this.model.pointY);
                fill(200, 0, 0);
                triangle(this.model.start, this.model.pointY, this.model.start + 10, this.model.pointY + 5, this.model.start + 10, this.model.pointY - 5);

            }
            else {
                line(this.arrowX, this.model.pointY, subtractionPixel, this.model.pointY);
                fill(200, 0, 0);
                triangle(subtractionPixel, this.model.pointY, subtractionPixel + 10, this.model.pointY + 5, subtractionPixel + 10, this.model.pointY - 5);

            }

            //DISPLAY subtraction value
            //Subtraction
            fill(255, 221, 221)
            stroke(0)
            rect(120, this.model.pointY + 170, 250, 80);

            fill(0);
            noStroke();
            textSize(16);
            textAlign(LEFT, CENTER);
            text(`Subtraction : ${centerValue} - 6 = ${subtractionValue}`, 130, this.model.pointY + 210);
        }

    }



    displayNearestValue(nearestValue) {

        //Value of addition a
        fill(0, 0, 255);
        noStroke();
        ellipse(map(this.model.pointX, this.model.start, this.model.end, width / 2 + 100, this.model.end), this.model.pointY + 110, 15);
        stroke(0, 0, 255);
        strokeWeight(2);
        line(width / 2 + 100, this.model.pointY + 110, this.model.end, this.model.pointY + 110);

         noFill();
         stroke(0);
         strokeWeight(1);
         rect(this.model.end+5, this.model.pointY + 90, 20, 20);

         fill(0);
         noStroke();
         textSize(16);
         textAlign(CENTER, CENTER);
         text(`${nearestValue}`, this.model.end+15, this.model.pointY + 100);

        fill(0);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text(`a = ${nearestValue}`, width / 2 + 200, this.model.pointY + 70);
        //console.log(nearestValue);


        //value of subtraction b
        fill(255, 0, 0);
        noStroke();
        ellipse(width / 2 + 200, this.model.pointY + 210, 15);
        stroke(255, 0, 0);
        strokeWeight(2);
        line(width / 2 + 100, this.model.pointY + 210, this.model.end, this.model.pointY + 210);

        noFill();
        stroke(0);
        strokeWeight(1);
        rect(this.model.end+5, this.model.pointY + 190, 20, 20);

        fill(0);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text(`${6}`, this.model.end+15, this.model.pointY + 200);

        fill(0);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text(`b = ${6}`, width / 2 + 200, this.model.pointY + 170);
    }
}