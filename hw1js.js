$('#searchform').submit(function(event){
	event.preventDefault();

	document.querySelector(".loader").style.display = 'block';
	

	let searchterm = document.querySelector("#inputterm").value;
	console.log(searchterm);

	let promise = $.ajax({
		type: "GET",
		url: "https://www.reddit.com/r/" + searchterm + ".json"
	});

	promise.then(function(reddits){
		console.log(reddits);
		document.querySelector(".loader").style.display = 'none';
		let fragment = document.createDocumentFragment();

		reddits.data.children.forEach(function(reddit){
		let div = document.createElement('div');
			let a = document.createElement('a');
			let p = document.createElement('p');
			let p2 = document.createElement('p');
			let hr = document.createElement('hr');
			a.innerHTML = reddit.data.title;
			a.href = reddit.data.url;
			p.innerHTML = reddit.data.score;
			p2.innerHTML = reddit.data.author;
			
			div.append(a);
			div.append(p);
			div.append(p2);
			div.append(hr);
			fragment.append(div);
		});

		$('#results').html(fragment);
	});
});