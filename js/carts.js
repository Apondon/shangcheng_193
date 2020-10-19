// 简化getElementById
function getId(id){
    return document.getElementById(id)
}
// 获取支付按钮
var payBtn = getId('pay')
// var payBtn = document.getElementById('pay')

// 获取总价
var totalPrice = getId('totalPrice')
// var totalPrice = document.getElementById('totalPrice')

// 获取全选按钮
var cka = getId('ckAll')
// var cka = document.getElementById('ckAll')

// 获取box元素
var box = getId('box')
// var box = document.getElementById('box')

// 购物车中商品数据
var goodsList = [
    // 每个对象都是一条商品数据
    {id:'gds1',name:'C#编程基础',price:88,num:1,check:true},
    {id:'gds2',name:'计算机基础',price:98,num:1,check:true},
    {id:'gds3',name:'photoshop',price:888,num:3,check:false},
    {id:'gds4',name:'web标准',price:988,num:2,check:false},
    {id:'gds5',name:'H%+C3',price:8,num:4,check:false},
    {id:'gds6',name:'Javascript',price:9,num:5,check:false},
]

// 获取需要绑定点击事件的checkbox
var cks = document.getElementsByClassName('ck')
// 定义一个flag判断全选按钮是否应该勾选 true 应该勾选  false 不该勾选
var flag = true


// 生成html结构的函数
function createCards (goodsList){
    // 定义一个字符串用于拼接

    var s = ''
    // 第二种字符串拼接方法
    for(let i = 0;i<goodsList.length;i++){
        s += `<div class="cardsItem">
            <!-- 标题 -->
            <div class="cds-tit">
                <label>
                    <input type="checkbox" class="ck" ${goodsList[i].check?'checked':''} data= ${goodsList[i].id}>
                    ${goodsList[i].name}
                </label>
            </div>
            <!-- 详情 -->
            <div class="cds-detail flx">
                <div class="cds-img"></div>
                <div class="cds-txt">
                    <div class="txt-ctt">名称:${goodsList[i].name}</div>
                    <div class="txt-ctt">编著: 爱谁谁</div>
                    <div class="txt-ctt">出版: 某某出版社</div>
                    <div class="txt-ctt">简介: 哔哔哔哔哔哔哔哔哔哔哔哔哔哔哔</div>
                </div>
            </div>
            <!-- 单价 -->
            <div class="cds-price flx">
                <div class="cds-pri">定价: ￥${goodsList[i].price}</div>
                <i class="iconfont cds-del" data= ${goodsList[i].id}>&#xe61a;</i>
            </div>
            <!-- 总价 -->
            <div class="cds-count flx">
                <div class="cds-cnt">总计: ￥${goodsList[i].price*goodsList[i].num}</div>
                <div class="cds-btn flx">
                    <span class="mdf reduce" data= ${goodsList[i].id}>-</span>
                    <span class="mdf">${goodsList[i].num}</span>
                    <span class="mdf add" data= ${goodsList[i].id}>+</span>                    
                </div>
            </div>
        </div> `
    }
    /*
        // 使用for循环动态生成页面结构 
        // 第一种字符串拼接方法
        for(let i = 0;i<goodsList.length;i++){
            s += '  <div class="cardsItem"> '+
                    ' <div class="cds-tit">'+
                        ' <label for="gds1">' +
                            ' <input type="checkbox" id="gds1"> '+
                                goodsList[i].name +
                            '</label>'+
                        '</div>'+
                        '<div class="cds-detail flx">' +
                            '<div class="cds-img"></div>'+
                            '<div class="cds-txt">'+
                                '<div class="txt-ctt">'+ goodsList[i].name +'</div>' +
                                '<div class="txt-ctt">编著: 爱谁谁</div>' +
                                '<div class="txt-ctt">出版: 某某出版社</div>' +
                                '<div class="txt-ctt">简介: 哔哔哔哔哔哔哔哔哔哔哔哔哔哔哔</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cds-price flx">' +
                            '<div class="cds-pri">定价: ￥' + goodsList[i].price + '  </div>' +
                            '<i class="iconfont cds-del">&#xe61a;</i>' +
                        '</div>'+
                    ' <div class="cds-count flx">'+
                            '<div class="cds-cnt">总计: ￥'+ (goodsList[i].price*goodsList[i].num) +'</div>'+
                            '<div class="cds-btn flx">'+
                                '<span class="mdf">-</span>'+
                            ' <span class="mdf">'+ goodsList[i].num +'</span>'+
                                '<span class="mdf">+</span> '      +             
                            '</div>'+
                        '</div>'+
                    '</div>'
        }
    */

    
    // 生成页面结构
    box.innerHTML = s
    // 对新生成的结构进行事件绑定
    bindEvents()
}
// 渲染页面商品
createCards(goodsList)
// 计算商品总价
countPrice()


// 全选按钮关联单选按钮
cka.addEventListener('change',function(){
    // 当前按钮的选中状态
    console.log(this.checked)
    // 当全选按钮选中
    if(this.checked){
        // 将单选按钮全部勾选
        for(let i = 0;i<cks.length;i++){
            cks[i].checked = true
        }
        // 将每条数据的check属性置为 true
        for(let i = 0;i<goodsList.length;i++){
            goodsList[i].check = true
        }
        console.log(goodsList)
    }else{ // 全选按钮取消选中
         // 将单选按钮全部取消勾选
         for(let i = 0;i<cks.length;i++){
            cks[i].checked = false
        }
        // 将每条数据的check属性置为 false
        for(let i = 0;i<goodsList.length;i++){
            goodsList[i].check = false
        }
        console.log(goodsList)

    }
    // 调用计算总价方法
    countPrice()
})

// 计算总价
function countPrice(){
    var n = 0
    // 遍历数据
    for(let i=0;i<goodsList.length;i++){
        // 若该商品是选中状态，则计算总价
        if(goodsList[i].check){
            // check值为true则进入该判断体
            // 总价 = 单价 * 数量
            n += goodsList[i].price*goodsList[i].num
        }
    }
    // 将计算后的商品总价显示在页面中
    totalPrice.innerText = '总计 : ￥' + n
}



// 动态生成的dom结构事件绑定函数
function bindEvents(){
    // 单选按钮关联全选按钮
    console.log(cks)
    // 遍历查找到的checkbox
    for(let i=0;i<cks.length;i++){
        // 给每个元素绑定change事件
        cks[i].addEventListener('change',function(){
            // this 指向当前事件绑定的元素
            console.log(this)
            // 获取当前元素上绑定的data属性值
            console.log(this.attributes.data.value)
            // 元素当前选中状态
            console.log(this.checked)
            // 遍历购物车中商品数据
            for(let j = 0;j<goodsList.length;j++){
                // 找到购物车中对应的数据
                if(goodsList[j].id == this.attributes.data.value){
                    goodsList[j].check = this.checked
                    flag = this.checked
                }
                // 判断是否有未被勾选的checkbox  
                if(goodsList[j].check == false) {
                    // 若进入该判断体，则说明有复选框未被选中 
                    flag = false 
                    // 全选按钮不该被勾选
                    cka.checked = false
                }
                // 若所有按钮都被勾选
                if(flag == true){
                    // 全选按钮应该被勾选
                    cka.checked = true
                }
            }
            console.log(goodsList)
            // 调用计算总价方法
            countPrice()
        })
    }
    // 找到加号/减号按钮
    var add = document.getElementsByClassName('add')
    var rdu = document.getElementsByClassName('reduce')

    // 给每个加号按钮绑定点击事件
    for(let i=0;i<add.length;i++){
        add[i].addEventListener('click',function(){
            // this 指向当前事件绑定的元素
            console.log(this)
            // 获取data属性的值
            console.log(this.attributes.data.value)
            // 遍历数据
            for(let i =0;i<goodsList.length;i++){
                // 判断修改哪条数据
                if(goodsList[i].id === this.attributes.data.value){
                    goodsList[i].num += 1
                }
            }
            console.log(goodsList)
            // 渲染页面结构
            createCards(goodsList)
            // 计算商品总价
            countPrice()
        })
    }
    // 给每个减号按钮绑定事件
    for(let i=0;i<rdu.length;i++){
        rdu[i].addEventListener('click',function(){
            // this 指向当前事件绑定的元素
            console.log(this)
            // 获取data属性的值
            console.log(this.attributes.data.value)
            // 遍历数据
            for(let i =0;i<goodsList.length;i++){
                // 判断修改哪条数据
                if(goodsList[i].id === this.attributes.data.value){
                    // 判断，若是数量小于1则不应再减少
                    if(goodsList[i].num>1){
                        goodsList[i].num -= 1
                    }
                    
                }
            }
            console.log(goodsList)
            // 渲染页面结构
            createCards(goodsList)
            // 计算商品总价
            countPrice()
        })
    }
    // 获取所有删除按钮
    var del = document.getElementsByClassName('cds-del')
    // 给删除按钮绑定事件
    for(let i=0;i<del.length;i++){
        del[i].addEventListener('click',function(){
            // this 指向绑定当前删除事件的按钮
            console.log(this)
            // 获取当前按钮上绑定的data属性的值
            console.log(this.attributes.data.value)
            // 遍历数据
            for(let i =0;i<goodsList.length;i++){
                // 查找要删除的数据
                if(goodsList[i].id === this.attributes.data.value){
                     // 进行数据删除
                     goodsList.splice(i,1) 
                }
            }
            console.log(goodsList)
             // 渲染页面结构
             createCards(goodsList)
             // 计算商品总价
             countPrice()
            //  修改全选按钮的选中状态
            // 判断全选按钮是否应该被选中
            // 1.重置flag值
            flag = true
            for(let i=0;i<goodsList.length;i++){
                if(!goodsList[i].check){
                    flag = false
                }
            }
            // flag 为true 
            cka.checked = flag
        })
    }
}


// 结算功能
payBtn.addEventListener('click',function(){
    var arr = [] // 保存未被结算的商品
    // 遍历商品数据
    for(let i=0;i<goodsList.length;i++){
        // 将check值为false的对象存入新数组
        if(!goodsList[i].check) arr.push(goodsList[i])
    }
    console.log(arr)
    // 将未选中的元素数组把原数组进行替换
    goodsList = arr
    createCards(goodsList)
    // 计算商品总价
    countPrice()
    // 重置全选按钮
    cka.checked = false
    // 提示
    alert('结算成功')
})
