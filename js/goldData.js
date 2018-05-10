var question_id;

//对testText管理
function TestTextManager(){
	this.id = [];
	this.type = [];
	this.title = []
	this.text = [];
	this.prompt = [];
}

//所有文本内容
TestTextManager.prototype.addText = function(testText){
	this.id.push(testText.id);
	this.type.push(testText.type);
	this.title.push(testText.title);
	this.text.push(testText.text);
	this.prompt.push(testText.prompt);
}

//修改测试问题的标题
TestTextManager.prototype.eidtTitle = function(testText){
	var index = this.id.indexOf(testText.id);	//获取该元素的坐标
	if(index > -1){
		this.title[index] = testText.title;
	}
}
//修改测试问题的文本内容
TestTextManager.prototype.eidtText = function(testText){
	var index = this.id.indexOf(testText.id);	//获取该元素的坐标
	if(index > -1){
		this.text[index] = testText.text;
	}
}
//修改测试问题的提示
TestTextManager.prototype.eidtProblem = function(testText){
	var index = this.id.indexOf(testText.id);	//获取该元素的坐标
	if(index > -1){
		this.prompt[index] = testText.prompt;
	}
}
//删除文本
TestTextManager.prototype.deleteText = function(test){
	var index = this.id.indexOf(test.id);	//获取该元素的坐标
	this.id.splice(index, 1);
	this.title.splice(index,1);
	this.type.splice(index,1);
	this.text.splice(index,1);
}
//Tesk单例模式
TestTextManager.getInstance = (function(){
	var instance;
	return function(){
		if(!instance){
			instance = new TestTextManager();
		}
		return instance;
	}
})();

//定义测试单行多行文本类
function TestText(){
	this.id = "";
	this.type = "";
	this.title = "";
	this.text = "";
	this.prompt = "";
}
//对testCheck管理
function TestCheckManager(){
	this.id = [];
	this.type = [];
	this.title = []
	this.text = [];
	this.checked = [];
	this.prompt = [];
}

//所有文本内容
TestCheckManager.prototype.addText = function(testCheck){
	this.id.push(testCheck.id);
	this.type.push(testCheck.type);
	this.title.push(testCheck.title);
	this.text.push(testCheck.text);
	this.prompt.push(testCheck.prompt);
	this.checked.push(testCheck.checked);
}

//修改测试问题的标题
TestCheckManager.prototype.eidtTitle = function(testCheck){
	var index = this.id.indexOf(testCheck.id);	//获取该元素的坐标
	if(index > -1){
		this.title[index] = testCheck.title;
	}
}

//修改选项状态
TestCheckManager.prototype.eidtCheck = function(id,i,type,checked){
	//判断是单项选择
	if(type === "radio"){
		var index = this.id.indexOf(id);	//获取本元素的坐标
		for(let j = 0; j < this.checked[index].length; j++){
			if(j == i){
				this.checked[index].splice(i,1,checked);	//修改元素的状态
			}else{
				this.checked[index].splice(j,1,false);	//把单选元素状态都改变false状态
			}
		}
	}
	if(type === "checkbox"){
		var index = this.id.indexOf(id);
		this.checked[index].splice(i,1,checked);	//修改点击元素的状态
	}
}
//修改选项
TestCheckManager.prototype.eidtText = function(id,i,text){
	var index = this.id.indexOf(id);
	this.text[index].splice(i,1,text);
}

//添加选项
TestCheckManager.prototype.addCheckbox = function(id,i){
	var index = this.id.indexOf(id);
	this.checked[index].splice(i,0,false);
	this.text[index].splice(i,0,"未命名");
}

//删除选项
TestCheckManager.prototype.deleteCheck = function(id,i){
	var index = this.id.indexOf(id);
	this.checked[index].splice(i,1);
	this.text[index].splice(i,1);
}

//修改测试问题的提示
TestCheckManager.prototype.eidtProblem = function(testText){
	var index = this.id.indexOf(testText.id);
	if(index > -1){
		this.prompt[index] = testText.prompt;
	}
}

//删除文本
TestCheckManager.prototype.deleteText = function(testCheck){
	var index = this.id.indexOf(testCheck.id);
	this.id.splice(index, 1);
	this.title.splice(index,1);
	this.type.splice(index,1);
	this.text.splice(index,1);
	this.checked.splice(index,1);
	this.prompt.splice(index,1);
}

//Tesk单例模式
TestCheckManager.getInstance = (function(){
	var instance;
	return function(){
		if(!instance){
			instance = new TestCheckManager();
		}
		return instance;
	}
})();

//定义测试选项文本类
function TestCheck(){
	this.id = "";
	this.type = "";
	this.title = "";
	this.text = [];
	this.prompt = "";
	this.checked = [];
	this.index;
}

//存储所有的类
function TestManager(){
	this.id = [];
}

//添加内容
TestManager.prototype.addTest = function(test){
	this.id.push(test.id);
}
//删除内容
TestManager.prototype.removeTest = function(test){
	var index = this.id.indexOf(test.id);
	if(index > -1){
		this.id.splice(index,1);
	}
}

//TestManager的单例模式
TestManager.getInstance = function(){
	var instance;
	return function(){
		if(!instance){
			instance = new TestManager();
		}
		return instance;
	}
}();

var TTM = TestTextManager.getInstance();	//定义个单例TestManager
var TCM = TestCheckManager.getInstance();	//定义个单例TestManager
var TM = TestManager.getInstance();	//定义单例TestManager
//查找文本元素的类型
TTM.indexType = function(id){
	var index = this.id.indexOf(id);
	if(index > -1){
		return this.type[index];
	}else{
		return false;
	}
}

//查找选项元素的类型
TCM.indexType = function(id){
	var index = this.id.indexOf(id);
	if(index > -1){
		return this.type[index];
	}else{
		return false;
	}
}

//加载文本问题赋值
TTM.loading = function(tTM){
	this.id = tTM.id;
	this.type = tTM.type;
	this.title = tTM.title;
	this.text = tTM.text;
	this.prompt = tTM.prompt;
}

//加载选项问题赋值
TCM.loading = function(tCM){
	this.id = tCM.id;
	this.type = tCM.type;
	this.title = tCM.title;
  this.checked = tCM.checked;
	this.prompt = tCM.prompt;
	this.text = tCM.text;
}

//加载所有测试问题的id
TM.loading = function(tM){
	this.id = tM.id;
}

//还回文本元素对象
TTM.returnText = function(id){
	var index = this.id.indexOf(id);
	if(index > -1){
		var returnTest = new Object();
		returnTest.id = this.id[index];
		returnTest.type = this.type[index];
		returnTest.title = this.title[index];
		returnTest.text = this.text[index];
		returnTest.prompt = this.prompt[index];
		return returnTest;
	}
	return false;
}

//还回选项元素对象
TCM.returnRadio = function(id){
	var index = this.id.indexOf(id);
	if(index > -1){
		var returnTest = new Object();
		returnTest.id = this.id[index];
		returnTest.type = this.type[index];
		returnTest.title = this.title[index];
		returnTest.checked = this.checked[index];
		returnTest.prompt = this.prompt[index];
		returnTest.text = this.text[index];
		return returnTest;
	}
	return false;
}

//两个文本隐藏一个文本
function hide(a,b){
	a.style.display = "none";
	b.style.display = "block";
}

//4个文本隐藏一个
function hideAll(a,b,c,d){
	a.style.display = "none";
	b.style.display = "none";
	c.style.display = "none";
	d.style.display = "block";
}

//生成编辑选项标签
function addCheck(node,type,eidt,index,i){
	var div = document.createElement("div");
	var a = document.createElement("a");
	var img = document.createElement("img");
	img.src = "";
	a.appendChild(img);
	div.appendChild(a);
	var input = document.createElement("input");
	input.type = type;
	input.name = type;
	//改版单选的状态
	input.onclick = function(){
		let questionNode = document.getElementById(question_id).getElementsByTagName("div");	//获取问题的节点
		let index = TCM.id.indexOf(question_id);
		let childs =  this.parentNode.parentNode.childNodes;
		//判断点击的那个单选元素
		for(var i = 0; i <childs.length; i++){
			if(this.parentNode == childs[i]){
				TCM.eidtCheck(question_id,i,this.type,this.checked);	//存储改变元素的状态
				questionNode[i].getElementsByTagName("input")[0].checked = this.checked;	//修改对应测试文本的状态
			}
		}
	}
	if(index || index == 0){	//编辑过测试问题的
		input.checked = TCM.checked[index][i];
	}
	div.appendChild(input);
	var inputText = document.createElement("input");
	inputText.type = "text";
	inputText.onblur = function(){
		let questionNode = document.getElementById(question_id).getElementsByTagName("div");	//获取当前问题的节点
		let index = TCM.id.indexOf(question_id);	//查找当前选项的在存储中的位置

		//改版选项的文本
		let childs =  this.parentNode.parentNode.childNodes;
		for(var i = 0; i <childs.length; i++){	
			if(this.parentNode == childs[i]){ //查找当前元素的文字
				if(this.value != ""){
					TCM.eidtText(question_id,i,this.value);	//保存当前元素的选项文本
					questionNode[i].getElementsByTagName("label")[0].innerHTML = this.value;	//修改对应问题的选项内容
				}
			}
		}
	}
	TCM.text[index][i];
	if(index || index == 0){
		if(TCM.text[index][i] != "选项"){
			inputText.value = TCM.text[index][i];
		}else{
			inputText.value = "";
		}
	}else{
		inputText.value = "";
	}
	div.appendChild(inputText);
	var plus = document.createElement("a");
	plus.innerHTML = "+";
	plus.onclick = function(){
		let questionNode = document.getElementById(question_id).getElementsByTagName("div");	//获取当前问题的节点
		let index = TCM.id.indexOf(question_id);
		let childs =  this.parentNode.parentNode.childNodes;
		addCheck(this.parentNode,TCM.type[index],true);	//添加编辑的选项

		//添加相对应的测试问题选项
		for(var i = 0; i <childs.length; i++){
			if(this.parentNode == childs[i]){
				addInput(questionNode[i],questionNode[i].firstChild.type);	//测试问题的选项
				TCM.addCheckbox(question_id,i);
			}
		}
	}
	div.append(plus);
	var minus = document.createElement("a");
	minus.innerHTML = "-";
	minus.onclick = function(){
		let questionNode = document.getElementById(question_id).getElementsByTagName("div");	//获取当前问题的节点
		let index = TCM.id.indexOf(question_id);
		let parentNode = this.parentNode.parentNode;
		if(parentNode.childNodes.length > 1){	//判断大于一条编辑选项
			for(var i = 0; i < parentNode.childNodes.length; i++){
				if(this.parentNode == parentNode.childNodes[i]){	//查找当前选项的位置
					questionNode[i].parentNode.removeChild(questionNode[i]);	//删除相对应测试的选项
					TCM.deleteCheck(question_id,i);	//删除存储中的当前选项
				}
			}
			parentNode.removeChild(this.parentNode);	//删除当前元素选项
		}
	}
	div.appendChild(minus);	
	if(eidt){
		node.parentNode.insertBefore(div,node.nextSibling);
	}else{
		node.appendChild(div);
	}
}

//添加问题文本
function addInput(node,type){
	var div = document.createElement("div");
	var input = document.createElement("input");
	input.type = type;
	input.name = node.firstChild.name;
	input.disabled = "disabled";
	var id = new Date().getTime(); 
	input.id = id;
	div.appendChild(input);
	var label = document.createElement("label");
	label.setAttribute("for",id);
	label.innerHTML = "选项";
	div.appendChild(label);
	node.parentNode.insertBefore(div,node.nextSibling);
}

//点击问题时加载
function loadEdit (index,type){
	var edit_title = document.getElementById("title");	//修改题目节点
	var edit_prompt = document.getElementById("prompt");	//修改提示节点
	var edit_single = document.getElementById("single");	//修改单行文本内容节点
	var edit_multiple = document.getElementById("multiple");	//修改多行文本节点
	var edit_radios	= document.getElementById("radios"); //修改单项选择节点
	var edit_checkboxs = document.getElementById("checkboxs");	//修改多项选择
	//加载单行文本
	if(type == "text"){
		if(TTM.title[index] != "未命名"){
			edit_title.value = TTM.title[index];
		}else{
			edit_title.value = "";
		}
		edit_prompt.value = TTM.prompt[index];
		edit_single.value = TTM.text[index];
	}

	//加载多行文本
	if(type == "textarea"){
		if(TTM.title[index] != "未命名"){
			edit_title.value = TTM.title[index];
		}else{
			edit_title.value = "";
		}
		edit_prompt.value = TTM.prompt[index];
		edit_multiple.value = TTM.text[index];
	}

	//加载单项选择
	if(type == "radio"){
		if(TCM.title[index] != "未命名"){
			edit_title.value = TCM.title[index];
		}else{
			edit_title.value = "";
		}
		edit_prompt.value = TCM.prompt[index];

		//清除头次加载的信息
		while(edit_radios.childNodes.length > 0){
			edit_radios.removeChild(edit_radios.lastChild);
		}
		for(var i = 0; i < TCM.checked[index].length; i++){
			addCheck(edit_radios,"radio",false,index,i);	//加载选项
		}
	}

	//加载多项选择
	if(type == "checkbox"){
		if(TCM.title[index] != "未命名"){
			edit_title.value = TCM.title[index];
		}
		edit_prompt.value = TCM.prompt[index];

		//清除头次加载的信息
		while(edit_checkboxs.childNodes.length > 0){
			edit_checkboxs.removeChild(edit_checkboxs.lastChild);
		}
		for(var i = 0; i < TCM.checked[index].length; i++){
			addCheck(edit_checkboxs,"checkbox",false,index,i);	//加载选项
		}
	}
}

//点击测试问题
function clickQuestions(question){
	question_id = question.id;
	var add = document.getElementById("add");	//生成默认题目
	var eidt = document.getElementById("edit");	//编辑样式的节点
	var single = document.getElementById("single");	//单行文字的节点
	var multiple = document.getElementById("multiple");	//多行文字的节点
	var radio = document.getElementById("radios");	//单选的盒子节点
	var checkbox = document.getElementById("checkboxs");	//多选的盒子节点
	var del = question.getElementsByTagName("a")[0];	//删除问题按钮
	let indexText = TTM.id.indexOf(question.id);
	let indexCheck = TCM.id.indexOf(question.id);
	hide(add,eidt);	

	//判断在储存文本中 生成编辑信息
	if(indexText > -1){
		if(TTM.type[indexText] == "text"){
			hideAll(multiple,radio,checkbox,single);
			loadEdit(indexText,TTM.type[indexText]);
		}
		if(TTM.type[indexText] == "textarea"){
			hideAll(radio,checkbox,single,multiple);
			loadEdit(indexText,TTM.type[indexText]);
		}
	}

	//判断在储存选项中 生成编辑信息
	if(indexCheck > -1){
		if(TCM.type[indexCheck] == "radio"){
			hideAll(multiple,checkbox,single,radio);
			loadEdit(indexCheck,TCM.type[indexCheck]);
		}
		if(TCM.type[indexCheck] == "checkbox"){
			hideAll(radio,single,multiple,checkbox);
			loadEdit(indexCheck,TCM.type[indexCheck]);
		}
	}

	//删除测试问题
	if(del){
		del.style.display = "block";	//显示出删除按钮
		let problems = document.getElementById("content").getElementsByTagName("a");
		for(let i = 0; i < problems.length; i++){
			if(del != problems[i]){
				problems[i].style.display = "none";
			}
		}
		del.onclick = function(event){
			hide(edit,add);
			question.parentNode.removeChild(question);	//移除选中的测试题目
			let testText = new TestText();
			testText.id = question.id;	//移除存储中保存的本元素数据
			TTM.deleteText(testText);	
			let testCheck = new TestCheck();
			testCheck.id = question.id;
			TCM.deleteText(testCheck);
			TM.removeTest(testText);
			TM.removeTest(testCheck);
			event.stopPropagation();	//取消冒泡
		}
	}
}

//判断生成的是什么类型的HTML
function addHtml(text){
	var div = document.createElement("div");
	div.id = new Date().getTime();
	div.onclick = function(){
  	clickQuestions(this);
  }
	//生成标题
	var p = document.createElement("p");
	p.innerHTML = "未命名";
	div.appendChild(p);

	//生成提示
	var prompt = document.createElement("p");
	prompt.innerHTML = "";
	div.appendChild(prompt);
	//添加单行文本
	if(text == "text"){
		var input = document.createElement("input");
		input.type = "text";
		input.disabled = "disabled";
		div.appendChild(input);
	}

	//添加文本区域
	if(text == "textarea"){
		var textarea = document.createElement("textarea");
		textarea.disabled = "disabled";
		div.appendChild(textarea);
	}

	//添加单项选择
	if(text == "radio"){
		var li = document.createElement("li"); 
		var type = "radio";
		var i = 1;
		var name = new Date().getTime();
		div.appendChild(options(li,type,i,div.id));	//生成选项
		div.appendChild(options(li,type,i+1,div.id));
		div.appendChild(options(li,type,i+2,div.id));
	}

	//添加多项选择
	if(text == "checkbox"){
		var li = document.createElement("li")
		var type = "checkbox";
		var i = 1;
		div.appendChild(options(li,type,i,div.id));
		div.appendChild(options(li,type,i+1,div.id));
		div.appendChild(options(li,type,i+2,div.id));
	}

	//添加img
	var a = document.createElement("a");
	a.style.display = "none";
	var img = document.createElement("img");
	img.src = "img/delt.png";
	a.appendChild(img);
	div.appendChild(a);
	return div;
}

//加载生成的测试题目
function addReturn(test){
	var div = document.createElement("div");
	div.id = test.id;
  div.onclick = function(){
  	clickQuestions(this);
  }
	//生成标题
	var p = document.createElement("p");
	p.innerHTML = test.title;
	div.appendChild(p);

	//生成提示
	var prompt = document.createElement("p");
	prompt.innerHTML = test.prompt;
	div.appendChild(prompt);
	//添加单行文本
	if(test.type == "text"){
		var input = document.createElement("input");
		input.type = "text";
		div.appendChild(input);
	}

	//添加文本区域
	if(test.type == "textarea"){
		var textarea = document.createElement("textarea");
		div.appendChild(textarea);
	}

	//添加单项选择
	if(test.type == "radio"){
		var li = document.createElement("li"); 
		var type = "radio";
		var i = 1;
		for(var i = 0; i < test.text.length; i++){
			var j = i;
			div.appendChild(options(li,test.type,j+1,test.id,test.text[i]));	//生成选项
		}
	}

	//添加多项选择
	if(test.type == "checkbox"){
		var li = document.createElement("li")
		var type = "checkbox";
		for(var i = 0; i < test.text.length; i++){
			var j = i;
			div.appendChild(options(li,test.type,j+1,test.id,test.text[i]));	//生成选项
		}
	}

	//添加img
	var a = document.createElement("a");
	a.style.display = "none";
	var img = document.createElement("img");
	img.src = "img/delt.png";
	a.appendChild(img);
	div.appendChild(a);
	return div;
}
//生成选项
function options(li,type,i,name,text){
	var div = document.createElement("div");
	var input = document.createElement("input");
	input.type = type;
	input.name = name;
	input.id = name + i;
	input.disabled = "disabled"
	div.appendChild(input);
	label = document.createElement("label");
	label.setAttribute("for",input.id);
	label.innerHTML = text || "选项";
	div.appendChild(label);
	li.appendChild(div);
	return li;
}

//运行程序
function run(){
	var contents = document.getElementById("content");	//题目的文本区域
	var add = document.getElementById("add");	//生成默认题目
	var li = add.getElementsByTagName("ul")[0].getElementsByTagName("li");	//生成默认题目区域的所有节点
	var nav = document.getElementById("nav");
	var navs = nav.getElementsByTagName("ul")[0].getElementsByTagName("li");	//获取导航栏的节点
	var eidt = document.getElementById("edit");	//编辑样式的节点
	var single = document.getElementById("single");	//单行文字的节点
	var multiple = document.getElementById("multiple");	//多行文字的节点
	var radio = document.getElementById("radios");	//单选的盒子节点
	var radios = radio.getElementsByTagName("input");	//单选的所有节点
	var addradios = radio.getElementsByTagName("a");	//单选添加删除input
	var checkbox = document.getElementById("checkboxs");	//多选的盒子节点
	var checkboxs = checkbox.getElementsByTagName("input"); //多选的所有节点
	var addCheckboxs = checkbox.getElementsByTagName("a");	//多选添加删除input
	var title = document.getElementById("title");	//问题的标题
	var prompt = document.getElementById("prompt"); //问题的提示

	//加保存中的问题
	if(localStorage.getItem("TM")){	//判断是否保存数据
		var tTM = JSON.parse(localStorage.getItem("TTM")); //获取保存的文本数据
		var tCM = JSON.parse(localStorage.getItem("TCM"));	//获取保存的选项数据
		var tM = JSON.parse(localStorage.getItem("TM"));	//获取保存问题的idconsole.log(tTM);
		TM.loading(tM);	//重新加载问题测试顺序
		TTM.loading(tTM);	//重新加载单行多行文本
		TCM.loading(tCM);	//重新加载选择问题
		for(var i = 0; i < TM.id.length; i++){
			var returnTest = TTM.returnText(TM.id[i])	//获取测试选项题目id为TM.id的对象
			var returnRadio = TCM.returnRadio(TM.id[i]);	//获取测试选项题目id为TM.id的对象
			if(returnTest){
				contents.appendChild(addReturn(returnTest));	//加载存储中的文本信息
			}
			if(returnRadio){
				contents.appendChild(addReturn(returnRadio));	//加载存储中的选项
			}
		}
	}
	for(var i = 0; i < li.length; i++){
		li[i].onclick = function(){	//生成默认题目
			var div = addHtml(this.getAttribute("data-type")); //动态生成题目的html文本
			contents.appendChild(div);	//添加题目
			let testText = new TestText();
			testText.id = div.id;	//获取生成测试问题的id
			testText.type = this.getAttribute("data-type");	//获取生成问题的类型
			if(testText.type == "text" || testText.type == "textarea"){
				testText.title = "未命名";
				testText.text = "";
				testText.prompt = "";
				TM.addTest(testText);
				TTM.addText(testText);
				//console.log(TTM);
			}
			let testCheck = new TestCheck();
			testCheck.id = div.id;	//获取生成测试问题的id
			testCheck.type = this.getAttribute("data-type");	//获取生成问题的类型
			if(testCheck.type == "radio" || testCheck.type == "checkbox"){
				testCheck.title =	"未命名";
				testCheck.checked = [ false, false, false];
				testCheck.text = ["选项","选项","选项"];
				testCheck.prompt = "";
				TM.addTest(testCheck);
				TCM.addText(testCheck);
			}
		}
	}

	//修改标题
	title.onblur = function(){
		let question_test = document.getElementById(question_id);
		if(this.value !=""){	//修改标题时 修改内容为空
			question_test.firstChild.innerHTML = this.value;	//修改测试题目标题
			let testText = new TestText();	
			testText.id = question_id;	//修改文本标题在存储中的id
			testText.title = this.value;//修改文本标题在存储中的id
			TTM.eidtTitle(testText);
			let testCheck = new TestCheck();
			testCheck.id = question_id;	//修改选项标题在存储中的id
			testCheck.title = this.value;	//修改选项标题在存储中的id
			TCM.eidtTitle(testCheck);
		}else{
			question_test.firstChild.innerHTML = "未命名";
		}	
	}

	//默认值，修改单行文字
	single.onblur = function(){
		let question_test = document.getElementById(question_id);
		if(this.value !=""){
			console.log(question_test);
			question_test.getElementsByTagName("input")[0].value = this.value;
			let testText = new TestText();
			testText.id = question_id;
			testText.text = this.value;
			TTM.eidtText(testText);
		}	
	}

	//默认值，修改多行文字
	multiple.onblur = function(){
		let question_test = document.getElementById(question_id);
		if(this.value !=""){
			let testText = new TestText();
				question_test.getElementsByTagName("input")[0].value = this.value;	//修改对应测试问题的
				testText.id = question_id;	//获取存储中对应的位置
				testText.text = this.value;	//修改储存中的文本信息
				TTM.eidtText(testText);
			}	
	}

	//修改提示
	prompt.onblur = function(){
		let question_test = document.getElementById(question_id);
		question_test.getElementsByTagName("p")[1].innerHTML = this.value;	//测试问题修改提示信息
		let testCheck = new TestCheck();
		let testText = new TestText();
		testText.prompt = this.value;
		testText.id = question_id;
		TTM.eidtProblem(testText);
		testCheck.prompt = this.value;
		testCheck.id = question_id;
		TCM.eidtProblem(testCheck);
		console.log(TCM);
	}
	//点击添加字段改变样式
	navs[0].onclick = function(){
		hide(eidt,add);
	}

	//点击编辑样式的改变
	navs[1].onclick = function(){
		add.style.display = "none";
		eidt.style.display = "none";
	}

	//保存数据
	document.getElementById("save").onclick = function(){
		localStorage.setItem("TTM",JSON.stringify(TTM));
		localStorage.setItem("TCM",JSON.stringify(TCM));
		localStorage.setItem("TM",JSON.stringify(TM));
		alert("保存成功");
	}
}
run();