module pomodoro_tracker_addr::tracker {
    use aptos_framework::event;
    use aptos_framework::account;
    use std::signer;
    use aptos_std::table::{Self, Table};
    use std::string::String;
   
    // Errors
    const E_NOT_INITIALIZED: u64 = 1;
    const E_CHALLENGE_DOES_NOT_EXIST: u64 = 2;
    
    struct PomodoroTracker has key {
        blocked_sites: Table<u64, String>,
        pomodoro_sessions: u64,
        successful_pomodoro: u64,
        total_challenges: u64,
        total_won: u64,
        total_points: u64,
        past_challenges: Table<u64, String>,
        challenge_status: Table<u64, bool>,
        session_event: event::EventHandle<u64>,
    }
    
    public entry fun init_tracker(account: &signer) {
        let tracker = PomodoroTracker {
            blocked_sites: table::new(),
            pomodoro_sessions: 0,
            successful_pomodoro: 0,
            total_challenges: 0,
            total_won: 0,
            total_points: 0,
            past_challenges: table::new(),
            challenge_status: table::new(),
            session_event: account::new_event_handle<u64>(account),
        };
        move_to(account, tracker);
    }
    
    public entry fun add_blocked_site(account: &signer, site: String) acquires PomodoroTracker {
        let tracker = borrow_global_mut<PomodoroTracker>(signer::address_of(account));
        let id = tracker.pomodoro_sessions + 1;
        table::upsert(&mut tracker.blocked_sites, id, site);
    }
    
    public entry fun add_pomodoro_session(account: &signer, success: bool) acquires PomodoroTracker {
        let tracker = borrow_global_mut<PomodoroTracker>(signer::address_of(account));
        tracker.pomodoro_sessions = tracker.pomodoro_sessions + 1;
        if (success) {
            tracker.successful_pomodoro = tracker.successful_pomodoro + 1;
        };
        event::emit_event(&mut tracker.session_event, tracker.pomodoro_sessions);
    }
    
    public entry fun add_challenge(account: &signer, challenge: String) acquires PomodoroTracker {
        let tracker = borrow_global_mut<PomodoroTracker>(signer::address_of(account));
        let id = tracker.total_challenges + 1;
        table::upsert(&mut tracker.past_challenges, id, challenge);
        table::upsert(&mut tracker.challenge_status, id, false);
        tracker.total_challenges = tracker.total_challenges + 1;
    }
    
    public entry fun complete_challenge(account: &signer, challenge_id: u64, won: bool, points: u64) acquires PomodoroTracker {
        let tracker = borrow_global_mut<PomodoroTracker>(signer::address_of(account));
        assert!(table::contains(&tracker.past_challenges, challenge_id), E_CHALLENGE_DOES_NOT_EXIST);
        table::upsert(&mut tracker.challenge_status, challenge_id, true);
        if (won) {
            tracker.total_won = tracker.total_won + 1;
            tracker.total_points = tracker.total_points + points;
        }
    }
}
