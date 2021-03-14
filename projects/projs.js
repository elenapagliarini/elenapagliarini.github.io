var projs = [];
var blockwidth = 512;

function onLoad() {
	var p = document.createElement("div");
	p.id = "p0";
	p.className = "proj_block";
	p.innerHTML = "		<img width=100% src='projects/ProjectDisjunction.png' alt='project image'>		<b>The interpretation of disjunction in negative sentences</b>";
	p.onclick = function click() {
		var pop = document.createElement("div");
		pop.id = "popup";
		pop.className = "overlay";
		pop.innerHTML = "<b>The interpretation of disjunction in negative sentences</b><br>			\n    <p>This line of investigation studies how children and adults interpret disjunction in negative contexts \n    across different languages. As for linguistic theory, the results offer empirical evidence to the \n    cross-linguistic distinction between PPI and non-PPI, but at the same time rise new questions, \n    such as the role of prosody in assigning interpretation to potentially ambiguous sentences. \n    As for language acquisition, the investigations of children’s understanding of disjunction under negation \n    in different languages reached the conclusion that children start by preferring the subset of the truth-conditions \n    assigned to the negated disjunction according to classical logic, independently from the interpretation assigned \n    by adult speakers of the local language. This pattern of responses has been explained in terms of a principle of \n    language learnability called Semantic Subset Principle (Crain et al., 1994). However, it emerges that others factors \n    are at play such as the presence of alternative forms for disjunction and the language-specific particularities of \n    the syntax and semantics of negation. \n </p>\n   \n";		setTimeout(add_popup, 100, document.getElementById("pop_place"), pop);
	};
	projs.push(p);

	var p = document.createElement("div");
	p.id = "p1";
	p.className = "proj_block";
	p.innerHTML = "		<img width=100% src='projects/ProjectScalar.jpg' alt='project image'>		<b>Scalar implicature in first language acquisition</b>";
	p.onclick = function click() {
		var pop = document.createElement("div");
		pop.id = "popup";
		pop.className = "overlay";
		pop.innerHTML = "<b>Scalar implicature in first language acquisition</b><br>			\n<p>Children accept a sentence such as 'Some giraffes wear a scarf' in a context in which all \ngiraffes are wearing a scarf – differently from adults who would reject such a sentence in that context. \nSo, for an adult, 'some' means 'not all', even if logically speaking 'all' asymmetrically entails 'some'. \nThis line of investigation focuses on how children derive this type of inferences - which are usually called scalar implicature -  \nand on their variable success in computing them. </p>\n";		setTimeout(add_popup, 100, document.getElementById("pop_place"), pop);
	};
	projs.push(p);

	var p = document.createElement("div");
	p.id = "p2";
	p.className = "proj_block";
	p.innerHTML = "		<img width=100% src='projects/ProjectQuanti.JPG' alt='project image'>		<b>Quantification in child language</b>";
	p.onclick = function click() {
		var pop = document.createElement("div");
		pop.id = "popup";
		pop.className = "overlay";
		pop.innerHTML = "<b>Quantification in child language</b><br>			\n<p>A fundamental power of human language is the capacity to refer to quantities of entities,\nas expressed by quantifiers, numerical and plural expressions. This project investigates how \nchildren interpret sentences with semantically plural arguments, such as the quantifier each and every. \nPrevious acquisition research showed that pre-schoolers assign non-adult-like interpretations to all \nand each and that the acquisition of quantification is a lengthy process. \nHowever, the source of the difficulty with quantifiers such as each and every is still unknown and a \nunifying account has not been proposed yet.\n\n </p>\n";		setTimeout(add_popup, 100, document.getElementById("pop_place"), pop);
	};
	projs.push(p);

	var p = document.createElement("div");
	p.id = "p3";
	p.className = "proj_block";
	p.innerHTML = "		<img width=100% src='projects/ProjectDyslexia.png' alt='project image'>		<b>The complex realm of Developmental Dyslexia</b>";
	p.onclick = function click() {
		var pop = document.createElement("div");
		pop.id = "popup";
		pop.className = "overlay";
		pop.innerHTML = "<b>The complex realm of Developmental Dyslexia</b><br>			\n<p>Developmental Dyslexia is a learning disorder characterized by specific difficulty in learning \nto read accurately and fluently. It has been argued that the source of the disorder in developmental \ndyslexia is phonological in nature. However, dyslexics often suffer from for fine and gross motor problems, \nsubtle deficits in the processing of morphosyntactic features and of complex syntactic structures, \nand experience difficulties in rhythm perception. </p>\n<p>This project aims at defining a \nmore-fine grained linguistic and cognitive profile of children with Developmental Dyslexia and of children with Specific Language Impairment. </p>\n";		setTimeout(add_popup, 100, document.getElementById("pop_place"), pop);
	};
	projs.push(p);

	 set_projs();
};

function add_popup(p, c) {
 p.appendChild(c);
};

function fill(cs) {
	const prd = document.getElementById("proj");
	while ( prd.firstChild ) {
		var row = prd.lastChild;
		while ( row.firstChild ) {
			row.removeChild(row.lastChild);
		}
		prd.removeChild(prd.lastChild);
	};

	var c = 0; var i = 0;
	for(i=0; i<projs.length; i++) {
		if(c == 0) {
			var row = document.createElement("div");
			row.className="proj_row";
		};
		row.appendChild(projs[i]);
		c++;
		if(c==cs) {
			document.getElementById("proj").appendChild(row);
			c=0;
		};
	};
	if ( (c > 0) && (c<cs) ) {
		for ( c; c<cs; c++ ) {
			var empty=document.createElement("div");
			empty.className="proj_block";
			empty.style="border-color:white";
			row.appendChild(empty);
		};
		document.getElementById("proj").appendChild(row);
	};
};

function set_projs() {
	var w = window.innerWidth*.8;
	var cs = Math.floor(w/blockwidth);
	fill(cs);
};

window.addEventListener("click", function(e) {
	if(document.getElementById("popup").contains(e.target)) {
	} else {
		var lst = document.getElementById("popup");
		document.getElementById("pop_place").removeChild(lst);
	};
});
