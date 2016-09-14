// 3D Vector object. By John haggerty (Slime).
// http://www.slimeland.com/
// Created January 21, 2003

function Vector(x,y,z)
{
	this.x=x; this.y=y; this.z=z;
}
Vector.prototype.copy = function() {
	return new Vector(this.x,this.y,this.z);
}
Vector.prototype.toString = function() {return '<' + this.x + ',' + this.y + ',' + this.z + '>';}
Vector.prototype.neg = function(){return new Vector(-this.x,-this.y,-this.z);}
Vector.prototype.inv = function(){return new Vector(1/this.x,1/this.y,1/this.z);}
Vector.prototype.transform = function(trans, donttranslate) { // requires transformation.js
	var newx,newy,newz
	if (donttranslate) {
		newx = Vector.dot(trans.vx,this);
		newy = Vector.dot(trans.vy,this);
		newz = Vector.dot(trans.vz,this);
	}
	else {
		newx = Vector.dot(trans.vx,this)+trans.c.x;
		newy = Vector.dot(trans.vy,this)+trans.c.y;
		newz = Vector.dot(trans.vz,this)+trans.c.z;
	}
	this.x = newx;
	this.y = newy;
	this.z = newz;
}
Vector.prototype.transformed = function(trans, donttranslate) { // requires transformation.js
	if (donttranslate) {
		return new Vector(
			Vector.dot(trans.vx,this),
			Vector.dot(trans.vy,this),
			Vector.dot(trans.vz,this)
		);
	}
	else {
		return new Vector(
			Vector.dot(trans.vx,this)+trans.c.x,
			Vector.dot(trans.vy,this)+trans.c.y,
			Vector.dot(trans.vz,this)+trans.c.z
		);
	}
}
Vector.prototype.length = function() {return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)};
Vector.prototype.lengthsquared = function() {return this.x*this.x + this.y*this.y + this.z*this.z};

Vector.normalize = function(vec) {var l=1/vec.length(); return new Vector(vec.x*l,vec.y*l,vec.z*l);};
Vector.add = function(v1,v2) {
	return new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z);
}
Vector.scalar = function(v1,s) {
	return new Vector(v1.x*s,v1.y*s,v1.z*s);
}
Vector.mult = function(v1,v2) {
	return new Vector(v1.x*v2.x, v1.y*v2.y, v1.z*v2.z);
}
Vector.dot = function(v1,v2)
{
	return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
}
Vector.cross = function(v1,v2)
{
	return new Vector(v1.y*v2.z-v1.z*v2.y, v1.z*v2.x-v1.x*v2.z, v1.x*v2.y-v1.y*v2.x);
}
Vector.compare = function(v1,v2)
{
	return (v1.x == v2.x && v1.y == v2.y && v1.z == v2.z);
}
Vector.X = new Vector(1,0,0);
Vector.Y = new Vector(0,1,0);
Vector.Z = new Vector(0,0,1);
Vector.O = new Vector(0,0,0);
