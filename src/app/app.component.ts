import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Status } from '../models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public phase: number = 0;
  public username: string = '';
  public response: string = 'Ciao! Come prima cosa, inserisci il tuo nome:';

  private instruction_base: string = 'Forza, inserisci il tuo nome:';
  private instruction: string = "";
  public status: Status = new Status();
  private statusKey: string = 'celi-status-key';

  constructor() {
    var storageItem = localStorage.getItem(this.statusKey);
    if (!storageItem) return;
    this.status = JSON.parse(storageItem);

    this.status = new Status(); //TODO: cancella qui, solo x test
  }

  public onNameSubmit() {
    let insertedInput = this.username;
    if (this.username === '') {
      return;
    }
    this.instruction = this.instruction_base;
    this.username = '';
    var toChecK = insertedInput.toLowerCase().trim();
    this.status.loginTry++;

    if (this.status.loginTry >= 5) {
      this.instruction = `<br>(Nel caso non si fosse ancora capito..questa è una prova in sè..hai ancora ${this.status.loginRequiredTries - this.status.loginTry} tentativi per superarla)</br>` + this.instruction_base
    }

    if (this.status.loginTry >= this.status.loginRequiredTries - 1) {
      this.instruction = `<br>Ok, non ci stiamo capendo...provo a rendertelo un pochino più esplicito.. (hai un ultimo tentativo)</br> Perfavore, inserisci <span class="highlight">il tuo nome</span>:`
    }

    if (this.status.loginTry >= this.status.loginRequiredTries) {
      this.instruction = `<br>Eh vabbè, la prima prova non è andata benissimo, ma non ti scoraggiare e prova comunque ad entrare, cerchiamo di rendere più esplicito cosa vogliamo.</br> Perfavore, inserisci <span class="highlight2">il tuo nome</span>:`
    }

    if (this.status.loginTry >= this.status.loginRequiredTries + 1) {
      this.instruction = `<br>Non ci siamo. Più di così non so come dirtelo</br> Perfavore, inserisci <span class="highlight3">il tuo nome</span> nella casella di testo qua sotto:`
    }

    if (insertedInput.trim().startsWith('simone')) {
      this.status.enableUppercase = true;
      this.response = `Oh suvvia, <b>${insertedInput}</b>, con la minuscola iniziale? Dai, puoi sforzarti di più..<br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK.includes('parola') && toChecK.includes('simone')) {
      this.response = `<b>${insertedInput}</b>. Nome e cognome nonostante io ti abbia chiesto di inserire il tuo nome. Non ci siamo.<br>${this.instruction}`;
      this.saveStatus();
      return;
    }
    if (insertedInput.trim().startsWith('Simone')) {
      this.response = `Oh bene, <b>${insertedInput}</b>, con la lettera maiuscola. Così va meglio =). Tuttavia mi spiace dirti che non è la risposta corretta :(<br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK.startsWith('vysor')) {
      this.response = `<b>${insertedInput}</b>! Ottimo tentativo! Ok che è il tuo nickname ma non è comunque quello che ti ho chiesto.<br>${this.instruction}`;
      this.saveStatus();
      return;
    }

    if (toChecK === "il tuo nome") {
      this.status.phase = 1;
      this.saveStatus();
      return;
    }

    this.response = this.instruction;
    this.saveStatus();
  }

  private saveStatus() {
    localStorage.setItem(this.statusKey, JSON.stringify(this.status));
  }
}

export enum MainPhase { }
