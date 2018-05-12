function getProdutos ()
{
    var s = document.createElement("script");
    s.src = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X";
    document.body.appendChild(s);
}

function X(obj) {
    montaComponent(obj.data.reference.item, obj.data.recommendation);
}


function montaComponent(produto, recomendacoes){
	
	document.getElementById('produto').insertAdjacentHTML('afterbegin', construirCardProduto(produto));
	
	recomendacoes.map(produto => {
		document.getElementById('recomendacoes').insertAdjacentHTML('afterbegin', construirCardProduto(produto));
	}
	);
	
	
}

function construirCardProduto(produto){
	
	return '<div class="produto" >' + 
			'<a href="' + produto.detailUrl + '"><img runat="server" src="'+ produto.imageName +'">' +
			'<p>' + produto.name + '</p>' +
			'<small>De: ' + produto.oldPrice + '</small><br>' +
			'<span>Por: ' + produto.price + '</span><br>' +
			'<span>' + produto.productInfo.paymentConditions + '</span></a>' +
		'</div>';
	
}

function X(obj) {
    montaComponent(obj.data.reference.item, obj.data.recommendation);
}

function mover(direcao) {

	const widthCard = 240;
	
	const widthContainer = document.getElementById("vitrine").offsetWidth;
	
	const elem = document.getElementById("recomendacoes");
	
	const totalCard = elem.childElementCount;
	
	let rect = elem.getBoundingClientRect();
	let x = rect.x - 118;
	let pos;

	if(direcao == 0){
		pos = (x * -1) + widthCard;
	}else{
		pos = (x * -1) - widthCard;
	}
	
	let numCardsPossiveisNaTela = Math.round(widthContainer/widthCard);
	let numCardsForadaTela = totalCard - numCardsPossiveisNaTela;
	
	let ultimaPosisao = (numCardsForadaTela * widthCard) + widthCard;
	
	if(pos < 0){
		elem.style.right = '0px'; 
		document.getElementById("direita").style.visibility = 'visible';
		document.getElementById("esquerda").style.visibility = 'hidden';
	} else if(pos > ultimaPosisao){
		document.getElementById("direita").style.visibility = 'hidden';
		document.getElementById("esquerda").style.visibility = 'visible';
	}else{
		document.getElementById("direita").style.visibility = 'visible';
		document.getElementById("esquerda").style.visibility = 'visible';
		elem.style.right = pos + 'px'; 
	}
}
