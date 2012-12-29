
(function() {
	//config 
	(function() {
		function g() {}
		g.prototype.desktopSettings = {
			width: function() {
				return 1024;
			},
			height: function() {
				return 450;
			},
			numberOfSequence: 10,
			sequenceLength : 25,
			box : function() {
				var x = this.boxWidth()/this.sequenceLength;
				var y = this.boxHeight()/this.numberOfSequence;
				if(x < y)
					return x;
				else
					return y;
			},
			boxLeft : function() {
				return this.width()/5;
			},
			boxWidth: function() {
				return this.width()/5*4;
			},	
			boxHeight: function() {
				return 400;
			},
			color : [ "rgb(113, 178, 226)", "rgb(153, 50, 204)","rgb(0, 128, 0)", "rgb(255, 165, 0)"],
		};

		g.prototype.determineSettings = function() {
			return this.desktopSettings;
		};

		var proto = g.prototype,
			attr = [
				["sequence",proto.sequence],
				["desktopSettings",proto.desktopSettings]
				];
		common.exportSingleton("config",g,attr);		
	})();
	//initalize for both desktop and tablet
	(function() {
		function a() {}
		a.prototype.background = function(settings) {
			var data = "<div id='background'>";
			for(var i=0; i<settings.numberOfSequence;i++) {
				for(var j=0;j<settings.sequenceLength;j++) {
					data+= "<div class='bgBox' style='top:"+(i*settings.box())+"px;left:"+(j*settings.box()+settings.boxLeft())+"px;'></div>";
				}
			}	
			$("#sandbox").append(data+"</div>");
			$(".bgBox").css({
				width: settings.box(),
				height: settings.box(),
			});
		};

		a.prototype.buildCube = function() {

		};
		
		var proto = a.prototype,
			attr = [
				["background", proto.background]
				];
		common.exportSingleton("generate",a,attr);

		String.prototype.trim = function() {
			return $.trim(this);
		};

		function init() {
			//initalizie sandbox
			var settings = config.determineSettings();
			$("#sandbox").css({
				"width" : settings.width(),
				"height" : settings.height()
			});	
			generate.background(settings);
		}

	})();
	
	(function() {
		function g() {};
		g.prototype.start = function() {
			$("#sandbox").html("");
			var doc = document, win = window;
			var settings = config.determineSettings();
			this.loadBackground(doc,win,settings);
			$("#sandbox").css({
				width : settings.width(),
				height : settings.height()
			});
			//this.loadStroke(doc,win,settings);
			this.loadMenu(doc,win,settings);
			this.listenToReload();
			/* temp fix */
		};
		g.prototype.restart = function() {
			var doc = document, win = window;
			var settings = config.determineSettings();
			this.loadMenu(doc,win,settings);
		};
		g.prototype.loadBackground = function(doc,win,settings) {
			
			var canvas = doc.createElement('canvas');
			var sandbox = doc.getElementById("sandbox");
			canvas.id = 'draw';
			canvas.style.position = "absolute";
			canvas.style.zIndex = 2;
			canvas.style.top = 0;
			canvas.style.left = 0;
			canvas.width = settings.width();
			canvas.height = settings.height();
		
			sandbox.appendChild(canvas);
		};

		g.prototype.loadMenu = function(doc,win,settings) {
			var f = this;
			$("#splashLogo").remove();
			var ctx = doc.getElementById('draw').getContext('2d');
			ctx.beginPath();
			ctx.clearRect(0,0,settings.width(),settings.height());
			
			var banner = new Image();
			var bannerValues = {
				x : 212,
				y : 30,
				w : 600,
				h : 200

			}
			banner.onload = function() {
				ctx.drawImage(banner,bannerValues.x,bannerValues.y,bannerValues.w,bannerValues.h);
			};
			banner.src = 'img/logo.png';
			ctx.fillStyle = "#F1F1F1";
			ctx.fillRect(212,250,600,120);

			ctx.closePath();
			var selection = [];
			//custom added for 4th in menuStr
			var menuStr = [window.lang.body.play.gameselect.levelselect.random["field 2"],window.lang.body.play.gameselect.levelselect["level id"]["field 2"],window.lang.body.play.gameselect.levelselect.disease["field 1"],window.lang.body.play.gameselect.levelselect.custom["field 1"]];

			var menuIcon = [
					["img/random.png",95,95],
					["img/id.png",95,95],
					["img/disease.png",95,95],
					["img/settings.png",95,95]	//custom icon
					];	
			var menuIconHover = ["img/random_hover.png","img/id_hover.png","img/disease_hover.png","img/options.png"]	

			//var menuBar = [
			var cell = function(ctx,x,y,i) {
				var menuStrColor = '#444';
				ctx.beginPath();			
				ctx.fillStyle = settings.color[i];
				var icon = new Image();
				icon.onload = function() {
					ctx.drawImage(icon,x,y,menuIcon[i][1],menuIcon[i][2]);
				}
				icon.src = menuIcon[i][0];
				ctx.fillStyle = menuStrColor;
				ctx.font = "19pt Helvetica";
				ctx.closePath();
				var iconOnHover = false;
				this.onOver =  function(eX,eY) {
					ctx.beginPath();
					if(x <= eX && eX <= x+menuIcon[i][1] &&
						y <= eY && eY <= y+menuIcon[i][2]) { 
						if( iconOnHover == false && window.isTablet == false) {
							ctx.clearRect(x,y,menuIcon[i][1],menuIcon[i][2])
							ctx.fillStyle = "#F1F1F1";
							ctx.fillRect(x,y,menuIcon[i][1],menuIcon[i][2]);
							var icon = new Image();
							icon.onload = function() {
								ctx.drawImage(icon,x,y,menuIcon[i][1],menuIcon[i][2]);
							}
							icon.src = menuIconHover[i];	
							ctx.fillStyle = "#6D6D6D";
							ctx.font = "19pt Helvetica";
							ctx.textAlign = "center";
							ctx.fillText(menuStr[i],515,420);
							iconOnHover = true;
						}
					} else {
						if(iconOnHover) {
							ctx.clearRect(x,y,menuIcon[i][1],menuIcon[i][2])
							ctx.fillStyle = "#F1F1F1";
							ctx.fillRect(x,y,menuIcon[i][1],menuIcon[i][2]);
							var icon = new Image();
							icon.onload = function() {
								ctx.drawImage(icon,x,y,menuIcon[i][1],menuIcon[i][2]);
							}
							icon.src = menuIcon[i][0];	
							iconOnHover = false;
							ctx.clearRect(0,390,1024,50);
						}
					}
					ctx.closePath();
				};
				this.onClick = function(eX,eY) {
					var menuStrColor = '#444';
					if(x <= eX && eX <= x+menuIcon[i][1] &&
						y <= eY && eY <= y+menuIcon[i][2]) { 
						switch(i) {
						case 3:	//case for custom
							ctx.beginPath();
							ctx.clearRect(0,0,1024,450);
							ctx.closePath();
							selection = [];
							//selection.push(new login(ctx));
							ctx.beginPath();
							ctx.fillStyle = menuStrColor;
							ctx.font = "20pt Helvetica";
							ctx.fillText(lang.body.play.gameselect.levelselect.custom["field 2"], 450, 170);
							ctx.closePath();
							var inputFile = document.createElement('input');
							inputFile.id = 'custom_inputfile1';
							inputFile.type = 'file';
							inputFile.name = 'custom_inputfile1';
							$('body').append(inputFile);
							selection.push(new custom(ctx));
							window.setTimeout(function() {
								selection.push(new back(ctx));
							},50);
							return;
							
							case 1:
								ctx.beginPath();
								ctx.clearRect(0,0,1024,450);
								ctx.closePath();
								selection = [];
								ctx.beginPath();
								ctx.fillStyle = menuStrColor;
								ctx.font = "20pt Helvetica";
								ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 3"], 490, 100);
								ctx.closePath();
								selection.push(new levelselect(ctx));
								window.setTimeout(function() {
									selection.push(new back(ctx));
								},50);
								return;
							case 2:
								var diseaseorder =  [
									["digestive","img/disease/digestive.png","150px",""],
									["heart", "img/disease/heart.png","110px","30px"],
									["cancer", "img/disease/cancer.png","100px","55px"],
									["metabolic", "img/disease/metabolic.png","100px",""],
									["blood","img/disease/blood.png","50px","10px"],
									["sensory","img/disease/sensory.png","60px","30px"],
									["brain","img/disease/brain.png","80px",""],
									["muscles","img/disease/muscles.png","60px",""],
									["lung","img/disease/lung.png","60px",""]
									];
								ctx.beginPath();
								ctx.textAlign = "center";
								ctx.clearRect(0, 0,1024,450);
								ctx.fillStyle = menuStrColor;
								ctx.font = "20pt Helvetica";	
								ctx.fillText(lang.body.play.gameselect.levelselect.disease["field 1"],settings.width()/2, 100);
								ctx.textAlign = "left";
								ctx.closePath();
								selection = [];
								window.setTimeout(function() {
								for(var j=0; j<diseaseorder.length; j++) {
									selection.push(new disease(ctx,diseaseorder[j],j));	
								}
								},50);
								selection.push(new back(ctx));
								return;
							case 0:
								ctx.beginPath();
								ctx.textAlign = "center";
								ctx.clearRect(0,0,1024,450);
								ctx.fillStyle = menuStrColor;
								ctx.font = "20pt Helvetica";	
								ctx.fillText(lang.body.play.gameselect.levelselect.random["field 1"], settings.width()/2,120);
								ctx.fillText(lang.body.play.gameselect.levelselect.random["field 3"], settings.width()/2,240);
								ctx.textAlign = "left";
								ctx.closePath();
								selection = [];
								for(var j=3;j<=8;j++) {
									selection.push(new random(ctx,j));
								}
								window.setTimeout(function() {
									selection.push(new back(ctx));
								},50);
								return;
						}
					}
				};
			} 

			var custom = function(ctx) { //custom
				$("#custom_inputfile1").show();
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = "rgb(153,50,204)";
				ctx.fillRect(710, 372, 120,40)
				ctx.fillStyle = "white";
				ctx.font = '19pt Helvetica';
				ctx.textAlign = "center";
				ctx.fillText(lang.body.play.gameselect.levelselect.custom["field 4"], 700, 400);
				ctx.textAlign = "left";
				ctx.restore();
				ctx.closePath();
				this.onClick = function(eX, eY) {
					if (700 < eX && eX < 830 && 370 < eY && eY < 420){
						$("#draw").hide();		
						/*$("#frame").show();
						var hash = window.location.hash.toUpperCase();
						hash = hash.replace('#',"").toLowerCase();
						document.getElementById('frame').src = 'http://phylo.cs.mcgill.ca/js/index2.html?lang='+hash+'&type=random&random='+i+'#home';
						*/
						$("#menu").hide();
						$("#custom_inputfile1").hide();
						$.rna.init({
							type: "custom",
							num: i,		
						});	
						return;
					}
				};
				this.onOver = function(eX, eY) {
					if (700 < eX && eX < 830 && 370 < eY && eY < 420){
						ctx.fillStyle = "#6D6D6D";
						ctx.fillRect(710, 372, 120, 40);
						ctx.fillStyle = "white";
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.body.play.gameselect.levelselect.custom["field 4"],770, 400);
						ctx.textAlign = "left";
						} else {
						ctx.fillStyle = "rgb(153,50,204)";
						ctx.fillRect(710,372,120,40);
						ctx.fillStyle = "white";
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.body.play.gameselect.levelselect.custom["field 4"],770,400);
						ctx.textAlign = "left";
						}
						ctx.restore();
						ctx.closePath();
					}
				};
				
			var levelselect = function(ctx) {	
				var menuStrColor = '#444';
				$("#level_inputbox").show();
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = "rgb(153,50,204)";
				ctx.fillRect(405,220,170,50);
				ctx.fillStyle = menuStrColor;
				ctx.font = '19pt Helvetica';
				ctx.textAlign = "center";
				ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 4"],490,252);
				ctx.textAlign = "left";
				ctx.restore();
				ctx.closePath();
				this.onClick = function(eX, eY) {
					if(405 < eX && eX < 525 &&
						220 < eY && eY < 270 ){
						var id = parseInt($("#level_inputbox").val().trim());
						if(isNaN(id)) {
							$.helper.popUp("Numbers Only!", function(status) {
								
							}, {
								cancel : false,
							});
							return;
						}
						$.ajax({
							url : "../phpdb/phyloExpertDB.php", 
							data : "mode=2&id="+id,
							type : "POST",
						}).done(function(data) {
							if(data == "" ) {
								//$.invalid.level();
								$.helper.popUp("Invalid level!", function(status) {
									
								}, {
									cancel : false,
								});
								
							} else {
								$("#draw").hide();
								$("#menu").hide();
								$("#level_inputbox").hide();
								$("#level_inputbox").val("");
								$.rna.init({
									type: "disease",
									num: id,		
								});	
							}
							return;
						}).fail(function(data) {
								$("#draw").hide();
								$("#menu").hide();
								$("#level_inputbox").hide();
								$("#level_inputbox").val("");
								$.rna.init({
									type: "disease",
									num: id,		
								});	

						});
					}	
				};
				this.onOver = function(eX,eY) {
					ctx.beginPath();
					ctx.save();
					if(405 < eX && eX < 525 &&
						220 < eY && eY < 270 ){

					ctx.fillStyle = "#6D6D6D";
					ctx.fillRect(405,220,170,50);
					ctx.fillStyle = "white";
					ctx.font = '19pt Helvetica';
					ctx.textAlign = "center";
					ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 4"],490,252);
					ctx.textAlign = "left";
					} else {
					ctx.fillStyle = "rgb(153,50,204)";
					ctx.fillRect(405,220,170,50);
					ctx.fillStyle = "white";
					ctx.font = '19pt Helvetica';
					ctx.textAlign = "center";
					ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 4"],490,252);
					ctx.textAlign = "left";

					}
					ctx.restore();
					ctx.closePath();
				};		
			};

			var disease = function(ctx, items, i) {
				var img = new Image();
				var img_hover = new Image();
				img.src = items[1];
				img_hover.src = items[1].replace('.png', '_hover.png');
				var hovered = false;
				img.onload = function() {
					ctx.beginPath();
					ctx.drawImage(img, 335+110*(i>=3?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
					ctx.closePath();
				};
				this.onClick = function(eX, eY) {
					if( 335+110*(i>=3?(i>=6?i-6:i-3):i) < eX && eX < 405+110*(i>=3?(i>=6?i-6:i-3):i) &&
						150+(i>=3?(i>=6?200:100):0) < eY && eY < 220+(i>=3?(i>=6?200:100):0)) {
						$("#draw").hide();		
						/*
						$("#frame").show();
						var hash = window.location.hash.toUpperCase();
						hash = hash.replace('#',"").toLowerCase();
						document.getElementById('frame').src = 'http://phylo.cs.mcgill.ca/js/index2.html?lang='+hash+'&type=disease&disease='+id+'#home';
						*/
						var id = diseaseList[i][1][Math.floor(Math.random()*diseaseList[i][1].length)];
						$("#menu").hide();
						$.rna.init({
							type: "disease",
							num: id,		
						});	
						return;
					}
				};
				    
                this.onOver = function(eX, eY) {
                    if( 335+110*(i>=3?(i>=6?i-6:i-3):i) < eX && eX < 405+110*(i>=3?(i>=6?i-6:i-3):i) &&
                        150+(i>=3?(i>=6?200:100):0) < eY && eY < 220+(i>=3?(i>=6?200:100):0)) {
                        ctx.beginPath();
                        ctx.clearRect(335+110*(i>=3?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
                        ctx.drawImage(img_hover, 335+110*(i>=3?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
                        ctx.closePath();
                        hovered = true;
                    } else {
                    	if(hovered) {
                    		ctx.beginPath();
                        	ctx.clearRect(335+110*(i>=3?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
                        	ctx.drawImage(img, 335+110*(i>=3?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
                        	ctx.closePath();
                        	hovered = false;
                    	}
                    }
                };
			};

			var onHover = false;
			var random = function(ctx, i) {
				var color= [ "rgb(113, 178, 226)", "rgb(153, 50, 204)","rgb(0, 128, 0)", "rgb(255, 165, 0)"];
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = color[((i-3)>=4?(i-3)-4:i-3)];
				ctx.fillRect(100+70*i, 150, 50,50);
				ctx.fillStyle = 'white';
				ctx.font = '19pt Helvetica';
				ctx.fillText(i,118+70*i,185);
				ctx.restore();
				ctx.closePath();
				this.onOver = function(eX,eY) {
					if(100+70*i < eX && eX < 150+70*i &&
						150 < eY && eY< 200) {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "#6D6D6D";
						ctx.fillRect(100+70*i, 150, 50,50);
						ctx.fillStyle = 'white';
						ctx.font = '19pt Helvetica';
						ctx.fillText(i,118+70*i,185);
						ctx.restore();
						ctx.closePath();

					} else {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = color[((i-3)>=4?(i-3)-4:i-3)];
						ctx.fillRect(100+70*i, 150, 50,50);
						ctx.fillStyle = 'white';
						ctx.font = '19pt Helvetica';
						ctx.fillText(i,118+70*i,185);
						ctx.restore();
						ctx.closePath();
					}
				};
				this.onClick = function(eX, eY) {
					if(100+70*i <eX && eX < 150+70*i  &&
						150 < eY && eY< 200) {
						$("#draw").hide();		
						$("#menu").hide();
						$.rna.init({
							type: "random",
							num: i,		
						});	
						return;
					}
				};
				 
			};

			var back = function(ctx) {
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = "#EF4136";
				ctx.fillRect(150,120,50,110);
				ctx.fillStyle = 'white';
				ctx.rotate(1.56);
				ctx.font = '19pt Helvetica';
				ctx.textAlign = "center";
				ctx.fillText(lang.header["field 9"],175,-165);
				ctx.textAlign = "left";
				ctx.restore();
				ctx.closePath();
				this.onOver = function(eX,eY) {
					if(150 < eX && eX < 200 &&
						120 < eY && eY < 230) {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "#6D6D6D";
						ctx.fillRect(150,120,50,110);
						ctx.fillStyle = "white";
						ctx.rotate(1.56);
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.header["field 9"],175,-165);
						ctx.textAlign = "left";
						ctx.restore();
						ctx.closePath();
					} else {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "#EF4136";
						ctx.fillRect(150,120,50,110);
						ctx.fillStyle = 'white';
						ctx.rotate(1.56);
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.header["field 9"],175,-165);
						ctx.textAlign = "left";
						ctx.restore();
						ctx.closePath();
					}
				
				};	
				this.onClick = function(eX,eY) {
					if(150 < eX && eX < 200 &&
						120 < eY && eY < 230) {
						ctx.beginPath();
						ctx.clearRect(0,60,1024,400);
						ctx.closePath();
						selection = [];
						//selection.push(new highscore(ctx));
						for(var i=0;i<4;i++) {	
							selection.push(new cell(ctx, 250+(160*i), 260,i));
						}
						var banner = new Image();
						banner.onload = function() {
							ctx.drawImage(banner,bannerValues.x,bannerValues.y,bannerValues.w,bannerValues.h);
						};
						$('#draw').mousemove(function(e) {
							var k = getCursorPosition(e);
							for(var i=0;i<selection.length;i++) {
								selection[i].onOver(k[0],k[1]);		
							}
						});
						banner.src = 'img/logo.png';
						ctx.fillStyle = "#F1F1F1";
						ctx.fillRect(212,250,600,120);
						$("#level_inputbox").val("").hide();
						$("#custom_inputfile1").hide();
					}
				};
			};

			for(var i=0;i<4;i++) {
				//selection.push(new cell(ctx,150,120+(50*i),i));
				selection.push(new cell(ctx, 250+(160*i), 260,i));
			}

			$('#draw').unbind().mousemove(function(e) {
				var k = getCursorPosition(e);
				for(var i=0;i<selection.length;i++) {
					selection[i].onOver(k[0],k[1]);		
				}
			}).click(function(e) {
				var k = getCursorPosition(e);
				for(var i=0;i<selection.length;i++) {
					selection[i].onClick(k[0],k[1]);		
				}
			});
		};

		g.prototype.listenToReload = function() {
			/*
			window.setInterval(function() {
				if(window.frames["frame"].window.location.hash.search(/reload/) > -1) {
					device.start();	
				}
			},1000); */
		};

		function getCursorPosition(e) {
			var gCanvasElement = document.getElementById("sandbox");
			var menu = document.getElementById("mid-panel");
			var x;
			var y;
			if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			} else {
				x = e.clientX + document.body.scrollLeft +
				    document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
				    document.documentElement.scrollTop;
			}
			// Convert to coordinates relative to the canvas
			x -= gCanvasElement.offsetLeft;
			y -= menu.offsetTop;
			return [x,y]
		}
			
		var proto = g.prototype,
			attr = [
				["start",proto.start],
				["restart",proto.restart]
				];
		common.exportSingleton("interactiveMenu",g,attr);
	})();
})()