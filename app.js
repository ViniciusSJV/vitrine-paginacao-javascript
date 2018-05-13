function getProdutos ()
{
    var s = document.createElement("script");
    s.src = "http://roberval.chaordicsystems.com/challenge/challenge.json?method=getQuote&lang=en&format=jsonp&jsonp=X";
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
	
	let oldPrice = "";
	
	if(produto.oldPrice != null){
	    oldPrice = '<small>De: ' + produto.oldPrice + '</small>';
	}
	
	return '<div class="produto">' + 
			'<img style="width:100%" src="http:'+ produto.imageName +'">' +
			'<p>' + produto.name + '</p>' +
			oldPrice +
			'<span>Por: ' + produto.price + '</span>' +
			'<span>' + produto.productInfo.paymentConditions + '</span>' +
			'<a href="'+produto.detailUrl+'"target="blank">Ver mais</a>'
		'</div>';
	
}

function mover(direcao) {

	const widthCard = 240;
	
	const widthContainer = document.getElementById("vitrine").offsetWidth;
	
	const elem = document.getElementById("recomendacoes");
	
	const totalCard = elem.childElementCount;
	
	let rect = elem.getBoundingClientRect();
	//ponto X do elemento q quero animar pra gerar o efeito de paginação; 
	//aqui eu tiro 118 de margim, botoes da paginacao, etc e asumo q meu elemento esta no ponto X = 0 da minha tela no primeiro momento
	//assim posso usar esse ponto X para saber os limites q posso mover meu elemento.
	let x = rect.x - 118;
	
	let posicao;

	if(direcao == 0){
		posicao = (x * -1) + widthCard;
	}else{
		posicao = (x * -1) - widthCard;
	}
	
	let numCardsPossiveisNaTela = Math.round(widthContainer/widthCard);
	let numCardsForadaTela = totalCard - numCardsPossiveisNaTela;
	
	let ultimaPosisao = (numCardsForadaTela * widthCard) + widthCard;
	
	if(posicao < 0){
		elem.style.right = '0px'; 
		document.getElementById("direita").style.visibility = 'visible';
		document.getElementById("esquerda").style.visibility = 'hidden';
	} else if(posicao > ultimaPosisao){
		document.getElementById("direita").style.visibility = 'hidden';
		document.getElementById("esquerda").style.visibility = 'visible';
	}else{
		document.getElementById("direita").style.visibility = 'visible';
		document.getElementById("esquerda").style.visibility = 'visible';
		elem.style.right = posicao + 'px'; 
	}
}
