import {IWriteToServiceBus} from "../bus/IWriteToServiceBus";
import {IMessageReceivedBus} from "../bus/IMessageReceivedBus";
import {Message} from "./Message";
import {SmartTimer} from "../timing/SmartTimer";
import {INotifier} from "../INotifier";

export class MarsRoverReceiver implements IWriteToServiceBus {
    private marsRoverServiceBus!: IMessageReceivedBus;
    private datagrams: Array<string> = new Array<string>();
    private smartTimer: SmartTimer = new SmartTimer();
    private notifier: INotifier = new class implements INotifier {
        private receiver: MarsRoverReceiver;
        constructor(receiver: MarsRoverReceiver) {
            this.receiver = receiver;
        }
        notifyMessage(data: Array<string>): void {
            this.receiver.notifyMessage2(data);
        }
    }(this);
    private MAX_DELAY_MILLISECONDS: number = 3000;

    writesTo(marsRoverServiceBus: IMessageReceivedBus): void {
        this.marsRoverServiceBus = marsRoverServiceBus;
    }

    received(datagram: string): void {
        this.datagrams.push(datagram);

        let message: Message = new Message(this.datagrams);

        if (message.isValid()) {
            this.marsRoverServiceBus.NotifyMessageReceived(message.toString());
            return;
        }

        this.smartTimer
            .waitMillisecond(this.MAX_DELAY_MILLISECONDS)
            .beforeDoing(this.notifier, this.datagrams);
        // Connascence of Timing 
        // ---- outisde this class someone must know "how much to wait" for a notified datagram message
      
    }

    private notifyMessage2(datagrams: Array<string>): void {
        let message: Message = new Message(datagrams);
        if(message.isValid()) {
            this.marsRoverServiceBus.NotifyMessageReceived(message.toString());
            return;
        }
        this.marsRoverServiceBus.NotifyError();
    }

}