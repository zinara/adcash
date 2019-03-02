import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  arrayTags: any = ''; // input tags
  mainTags = []; // output tags

  // condition to parse item if local storage is not empty
  itemsArray = localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : [];
  arrayString: any;
  persister: number[];
  tagToPush = [];

  constructor() {
   localStorage.setItem('tags', JSON.stringify(this.itemsArray));
   this.persistTag();
   }

  ngOnInit() {

  }

 addTags() {
   // Remove any line breaks; commas and semicolons
   const arrayOfStrings = this.arrayTags.split(/,|;|\r?\n/g);
   this.arrayTags = ' ';
   // Filter off all non-numerical values
   this.itemsArray = arrayOfStrings.filter(str => !isNaN(str));
   // Add values to local storage
   localStorage.setItem('tags', JSON.stringify(this.itemsArray));
  this.tagToPush = JSON.parse(localStorage.getItem('tags'));
  this.tagToPush = this.whiteSpaceRemover(this.tagToPush);
   this.tagToPush.forEach(tag => {
     this.mainTags.push(tag);
     localStorage.setItem('tags', JSON.stringify(this.mainTags));
    });
 }

 // persist tags even after page refresh
 persistTag() {
 this.persister = JSON.parse(localStorage.getItem('tags'));
 // check if local storage is empty; if true, return
 if (this.persister.length === 0) {
  return;
 } else {
  this.mainTags = this.persister;
  return this.mainTags;
 }
 }

 whiteSpaceRemover(arr: any[]): any[] {
 const whitespace = '';
 arr = arr.filter(val => val !== whitespace);
 return arr;
 }

 // delete tags from list and from storage
 deleteTag(val): number[] {
 const array = this.mainTags;
 const id = array.indexOf(val);
 const removed = array.splice(id, 1);
 localStorage.setItem('tags', JSON.stringify(array));
 return array;

  }

  // show the edit tag dialog
  editTags() {
  const array = this.mainTags;
  this.arrayString = array.join(',');
  }

  // update tag values with new values
  save() {
  const backToArray = this.arrayString.split(/,|;|\r?\n/g);
  let numCheck = backToArray.filter(str => !isNaN(str));
  numCheck = this.whiteSpaceRemover(numCheck);
    localStorage.setItem('tags', JSON.stringify(numCheck));
    this.mainTags = JSON.parse(localStorage.getItem('tags'));
  }
 }




