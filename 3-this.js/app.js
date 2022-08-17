function hello() {
    console.log(this);
    console.log(this === global);
}

hello();

class A {
    constructor(num) {
        this.num = num;
    }
    memberFunction() {
        console.log('-------class----------')
        console.log(this);
        console.log(this === global);
    }

    // 클래스에서 this란 자기 자신을 가리킴
}

const a =new A(1);
a.memberFunction();

console.log('-------global ---------')
console.log(this);
console.log(this === module.exports);

// this는 함수,클래스,전역스코프에서 각각 다른 의미를 갖는다.