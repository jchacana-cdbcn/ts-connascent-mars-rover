import {ISmartTimer} from "./ISmartTimer";
import {INotifier} from "../INotifier";
import {Timer} from "./Timer";
import {TimerTask} from "./TimerTask";

export class SmartTimer implements ISmartTimer {
    private millisecondsToWait!: number;
    private isRunning: boolean = false;
    private timer: Timer = new Timer();
    private task!: TimerTask;
    public  notifier: INotifier = new class implements INotifier {
        notifyMessage(data: Array<string>): void {
        }
    }

    waitMillisecond(milliseconds: number): ISmartTimer {
        this.reset();
        this.millisecondsToWait = milliseconds;
        return this;
    }

    beforeDoing(notifier: INotifier, datagrams: Array<string>): ISmartTimer {
        this.notifier = notifier;
        const self = this;
        this.task = new class implements TimerTask {
            cancel(): void {
                self.timer.cancel();
            }
            run(): void {
                notifier.notifyMessage(datagrams);
                self.reset();
            }
        }
        this.timer.schedule(this.task, this.millisecondsToWait);
        return this;
    }

    private reset(): ISmartTimer {
        if( this.task != undefined) {
            this.task.cancel();
        }
        return this;
    }



}