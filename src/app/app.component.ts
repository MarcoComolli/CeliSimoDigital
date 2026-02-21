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

  private instruction: string = 'Forza, inserisci il tuo nome:';
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
    this.username = '';
    var toChecK = insertedInput.toLowerCase().trim();
    this.status.loginTry++;
    if (insertedInput.trim().startsWith('simone')) {
      this.status.enableUppercase = true;
      this.response = `Oh suvvia, <b>${insertedInput}</b>, con la minuscola iniziale? Dai, puoi sforzarti di più..<br>${this.instruction}`;
      this.saveStatus();
      return;
    }
    if (insertedInput.trim().startsWith('Simone')) {
      this.response = `Oh bene, <b>${insertedInput}</b>, con la lettera maiuscola. Così va meglio =). Tuttavia mi spiace dirti che non è la risposta corretta :(<br>${this.instruction}`;
      this.saveStatus();
    }
    if (toChecK === "il tuo nome") {
      this.status.phase = 1;
      this.saveStatus();
    }
  }

  private saveStatus() {
    localStorage.setItem(this.statusKey, JSON.stringify(this.status));
  }
}

export enum MainPhase {}
