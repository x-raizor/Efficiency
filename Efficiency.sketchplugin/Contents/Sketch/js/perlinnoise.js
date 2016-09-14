// PerlinNoise object. By John Haggerty (Slime).
// http://www.slimeland.com/
// Created January 21, 2003

// requires vector.js.

// possible values are (.8296815753293, 11). Don't go high with the second argument; it's exponential.
// warning: creation of a PerlinNoise object can be very slow.
// evaluation of one isn't all that speedy either.
function PerlinNoise(_seed, arraysizepower) {
	var seed = _seed, len;
	var val1,val2,val3;
	
	this.arraysize = Math.pow(2,arraysizepower);
	this.bitmask = this.arraysize-1;
	
	this.gradients = new Array();
	for (var a=0; a < this.arraysize; a++) {
		val1 = (seed=PerlinNoise.rand(seed))*2-1;
		val2 = (seed=PerlinNoise.rand(seed))*2-1;
		val3 = (seed=PerlinNoise.rand(seed))*2-1;
		this.gradients[a] = new Vector(val1, val2, val3);
		
		len = this.gradients[a].lengthsquared();
		if (len > 1 || len == 0)
			a--; // skip this one
		else
			this.gradients[a] = Vector.normalize(this.gradients[a]);
	}
	
	this.permutation = new Array();
	for (var a=0; a < this.arraysize; a++) {
		this.permutation[a] = a;
	}
	// find a permutation
	for (var a=0; a < this.arraysize; a++) {
		seed=PerlinNoise.rand(seed);
		switchwith = a+Math.floor((this.arraysize-a)*seed);
		
		temp = this.permutation[a];
		this.permutation[a] = this.permutation[switchwith];
		this.permutation[switchwith] = temp;
	}
	// duplicate arrays onto selves (avoids operations later)
	for (var a=this.arraysize; a < this.arraysize*2; a++) {
		this.gradients[a] = this.gradients[a-this.arraysize];
		this.permutation[a] = this.permutation[a-this.arraysize];
	}
}

PerlinNoise.bignum = 48271 //Math.pow(2,11)-1;
PerlinNoise.rand = function(seed) // random number generator, seed should be 0-1
{
	var base = PerlinNoise.bignum*seed;
	return base-Math.floor(base);
	//return Math.mod(bignum2*seed,bignum)/bignum;
}

PerlinNoise.interpolate = function(a,b,amnt)
{
	return a+amnt*(b-a);
}
PerlinNoise.cubicwave = function(x)
{
	return x*x*(3-2*x);
}

PerlinNoise.getval = function(gradient,x,y,z)
{
	return gradient.x*x + gradient.y*y + gradient.z*z;
}

PerlinNoise.prototype.evaluate = function(pos)
{
	var x1,y1,z1,x2,y2,z2;
	var sx,sy,sz,tx,ty,tz, ix,iy,iz;
	var a,b,c,d,e,f;
	
	// get integral x,y,z values of the corners of this unit box; also get distances from the sides of the box
	x1 = Math.floor(pos.x);   sx = pos.x-x1;
	y1 = Math.floor(pos.y);   sy = pos.y-y1;
	z1 = Math.floor(pos.z);   sz = pos.z-z1;
	x2 = x1+1;                tx = sx-1;
	y2 = y1+1;                ty = sy-1;
	z2 = z1+1;                tz = sz-1;
	
	// values used for cubic(?) interpolation
	ix = PerlinNoise.cubicwave(sx);
	iy = PerlinNoise.cubicwave(sy);
	iz = PerlinNoise.cubicwave(sz);
	
	// binary ands: performs a modulo operation with arraysize since arraysize is 2^something.
	x1 = x1 & this.bitmask;
	y1 = y1 & this.bitmask;
	z1 = z1 & this.bitmask;
	x2 = x2 & this.bitmask;
	y2 = y2 & this.bitmask;
	z2 = z2 & this.bitmask;
	
	// get a random value between 0 and arraysize*2 pertaining to this point in space
	bz1 = this.permutation[z1];
	bz2 = this.permutation[z2];
	
	by1z1 = this.permutation[y1+bz1];
	by2z1 = this.permutation[y2+bz1];
	by1z2 = this.permutation[y1+bz2];
	by2z2 = this.permutation[y2+bz2];
	
	// calculate value from each corner of the surrounding unit box and interpolate
	a = PerlinNoise.getval(this.gradients[x1+by1z1], sx,sy,sz);
	b = PerlinNoise.getval(this.gradients[x2+by1z1], tx,sy,sz);
	c = PerlinNoise.interpolate(a,b,ix);

	a = PerlinNoise.getval(this.gradients[x1+by2z1], sx,ty,sz);
	b = PerlinNoise.getval(this.gradients[x2+by2z1], tx,ty,sz);
	d = PerlinNoise.interpolate(a,b,ix);
	
	e = PerlinNoise.interpolate(c,d,iy);

	a = PerlinNoise.getval(this.gradients[x1+by1z2], sx,sy,tz);
	b = PerlinNoise.getval(this.gradients[x2+by1z2], tx,sy,tz);
	c = PerlinNoise.interpolate(a,b,ix);

	a = PerlinNoise.getval(this.gradients[x1+by2z2], sx,ty,tz);
	b = PerlinNoise.getval(this.gradients[x2+by2z2], tx,ty,tz);
	d = PerlinNoise.interpolate(a,b,ix);
	
	f = PerlinNoise.interpolate(c,d,iy);
	
	return (PerlinNoise.interpolate(e,f,iz)+1)/2; // (...+1)/2 since we want a number from 0 to 1, by default it should be -1 to 1
}

PerlinNoise.prototype.evaluatecolor = function(pos) // requires texture.js
{
	noiseval = this.evaluate(pos);
	return new Color(noiseval,noiseval,noiseval);
}
