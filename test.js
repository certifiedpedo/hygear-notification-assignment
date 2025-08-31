function sum(a,b,c){
    return a+b+c;
}



function curry(fn){

    return function curried(...args){
        if (args.length >= fn.length){
            fn.apply()
        }else{
            return  curried.apply(this,)
        }
    }
}