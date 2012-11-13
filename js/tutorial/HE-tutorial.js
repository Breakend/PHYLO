//enclosure
(function() {
	//json structure

	window.json = { //declared global
    
		tutorial: {
            "basics": {
                "field 1": "Basics: Rules and tips",
                "field 2": "In Phylo, your goal is to move sequences of  blocks horizontally in order to create the maximum number of columns of similar colors. Each color match gives you a bonus.",
                "field 3": "However, the sequences are not identical. Thus, color mismatches and gaps are unavoidable and you receive penalties for that. Your challenge is to find the  best trade-off between bonuses and penalties.",
                "field 4": "Bonuses and penalties for color matches and mismatches are small. But the cost of gaps is big! It is usually preferable to have a long gap rather than several small ones. Try to minimize the number of gaps in priority.",
                "field 5": "Did you notice the tree on the left? It tells you which sequences must be aligned in priority. This is helpful when you have to favor one color match versus another one. It is more important to conserve identical patterns for sequences in the same group than increasing similarities between different groups.",
                "field 6": "To reach the final stage, you need to pass the levels. This requires to beat the par (i.e. the computer score). When your score is equal or higher than the par, a shiny star appears at the bottom right corner. Click on it to reach the next stage. When all sequences are on the board, try to get the higher score possible and submit it by clicking the star again!",
                "field 7": "Basic information are available at the bottom right corner of your game board. There, you will find your current score, the par (i.e. the computer score to beat), your advancement in the game (i.e. stages) and the best score you obtained so far. You can revert at anytime to the best solution you found by clicking the multi-color wheel. Above you also see your timer and the time left to finish the puzzle.",
            },
            "scoring": {
		"field 1": "Advanced: Scoring.",
		"field 2": "Each node of the phylogenetic tree stores an ancestor sequence. Ancestors are computed automatically and represent a consensus of all sequences derived from it. Point at any node of the tree to display the corresponding sequence at the botton of the grid. By default, we display the ancestor at the root of the tree",
		"field 3": "The alignment score estimates the similarity between a sequence and its ancestor. A color match brings you a bonus of +1 and a color mismatch costs you a penalty of -1. The creation of a gap has a penalty of -5 and its extension by one unit costs -1. Here, the alignment score between the sequence of the bat and its ancestor is -4 (12 matches, 5 mistmatches, 1 gap of length 1 and 1 gap of length 2).",
		"field 4": "Your score is the sum of the alignment scores of each sequences with their immediate ancestor. Here, the score is the sum of the comparisons between the ancestor of B with human and chimp, the ancestor C with dog and bat, and the ancestor A with B and C.",
            },
            "example": {
		"field 1": "Getting ready: An example.",
		"field 2": "You are starting with two sequences (human and chimp). Push everything on the left and check out the ancestor. Aligning this ancestor with your two sequences gives you 13 matches for the first sequence (human), and 5 matches, 1 mismatches, and one gap of length 7 for the second sequence (chimp). Thus a total of 18 × (+1) + 1 × (‐1) + (‐5 + 6 × (‐1)) = 6. You beat the par. Click on the star and jump to the next stage!",
		"field 3": "Two new sequences (dog and bat) appear. Again, push them all to the left. Your score is 4. 18 matches and 1 gap of length 1 between the dog's sequence and its ancestor, and 5 matches and 14 mismatches between the bat sequence and the same ancestor (Thus a total of 23 × (+1) + 14 × (‐1) + (‐5) = 4). You can do better. How?",
		"field 4": "Shift the bottom sequence of one unit to the right starting from the seventh block. You create an additional gap but you also create many matches. Did you notice? the ancestor changed. You have now 18 matches and 1 gap of length 2 with the dog's sequence, and 12 matches, 7 mismatches and 1 gap of length 1 with the bat's sequence. Your score is 30 × (+1) + 7 × (‐1) + ( 2 × ‐5 + 1 × (-1)) = 12. Move to the next stage.",
		"field 5": "Now, you have to assemble your previous alignments. Your initial score is 14. It does not beat the par (19)… Intuitively, we want to find a better alignment of the 1st block (the two top sequences) and the 2nd block (the two lower sequences). How?",
		"field 6": "Shift the first block by 4 units to the right. This move creates two complete green columns. It also improve the similarity between the human's sequence and those of the dog and the bat. Your total score is now 26. How is it calculated?",
		"field 7": "Lets have a look at the human and chimp ancestor. Its alignment score with the human sequence is 11 (12 matches and 1 mismatch), and -5 with the chimp sequence (6 matches and 1 gap of length 7). Thus the score at this ancestor node is 11 + (-5) = 6.",
		"field 8": "We do the same thing for the dog and bat ancestor. Its alignment score with the dog sequence is 14 (16 matches and 2 mismatches) and -4 with the bat sequence (12 matches, 5 mismatches, 1 gap of length 1, and 1 gap of length 2). Thus, the score at this ancestor node is 14 + (-4) = 10.",
		"field 9": "To complete your score, you need to compute the alignment score of the human/chimp ancestor and dog/bat ancestor with the ancestor at the root of the tree. First, we compute the alignment score of the human/chimp ancestor with the global ancestor. There is 9 matches, 4 mismatches, 1 gap of length 4 and 1 gap of length 4. The score is 9 × (+1) + 4 × (‐1) + ( 2 × ‐5 + 3 × (-1)) = -8.",
		"field 10": "Then, we compute the alignment score of the dog/bat ancestor with the global ancestor. There is 18 matches and the score is 18. Therefore, the score associated with the root is (-8) + 18 = 10.",
		"field 11": "Your final score is the sum of all individual scores previously computed. It is summarized in the tree, where each node is labelled with the score of the alignment of its descendants. Here, the score of the alignment of human and chimp is 6, the score  of the alignment of dog and bat is 10, the score of the alignment of ancestors with the root is 10. Thus, your total score is 26 and it is displayed at the root of the tree.",
		"field 12": "You have the highest score. Click the star and submit your puzzle. You are done! The level id for this puzzle is 3847. Now, you are ready to play!",
            },
            "misc": {
                "field 1": "match",
                "field 2": "mismatch",
                "field 3": "gap",
                "field 4": "phylogenetic tree",
            },

        },
    
    }

})();

//enclosure
(function() {

	
	$("#basics1").html(json.tutorial["basics"]["field 1"]);
	$("#basics2").html(json.tutorial["basics"]["field 2"]);
	$("#basics3").html(json.tutorial["basics"]["field 3"]);
	$("#basics4").html(json.tutorial["basics"]["field 4"]);
	$("#basics5").html(json.tutorial["basics"]["field 5"]);
	$("#basics6").html(json.tutorial["basics"]["field 6"]);
	$("#basics7").html(json.tutorial["basics"]["field 7"]);

	$("#scoring1").html(json.tutorial["scoring"]["field 1"]);
	$("#scoring2").html(json.tutorial["scoring"]["field 2"]);
	$("#scoring3").html(json.tutorial["scoring"]["field 3"]);
	$("#scoring4").html(json.tutorial["scoring"]["field 4"]);
    
	$("#example1").html(json.tutorial["example"]["field 1"]);
	$("#example2").html(json.tutorial["example"]["field 2"]);
	$("#example3").html(json.tutorial["example"]["field 3"]);
	$("#example4").html(json.tutorial["example"]["field 4"]);
	$("#example5").html(json.tutorial["example"]["field 5"]);
	$("#example6").html(json.tutorial["example"]["field 6"]);
	$("#example7").html(json.tutorial["example"]["field 7"]);
	$("#example8").html(json.tutorial["example"]["field 8"]);
	$("#example9").html(json.tutorial["example"]["field 9"]);
	$("#example10").html(json.tutorial["example"]["field 10"]);
	$("#example11").html(json.tutorial["example"]["field 11"]);
	$("#example12").html(json.tutorial["example"]["field 12"]);


})();
